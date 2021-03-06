(function() {
    'use strict';

    angular
        .module('jhipsterApp')
        .controller('UbicacionDialogController', UbicacionDialogController);

    UbicacionDialogController.$inject = ['$scope', '$state', '$stateParams', '$uibModalInstance', 'entity', 'Ubicacion', 'Precio', 'Cervesa','NgMap'];

    function UbicacionDialogController ($scope, $state, $stateParams, $uibModalInstance, entity, Ubicacion, Precio, Cervesa, NgMap) {
        var vm = this;
        vm.ubicacion = entity;
        vm.precios = Precio.query();
        vm.cervesas = Cervesa.query();
        vm.load = function(id) {
            Ubicacion.get({id : id}, function(result) {
                vm.ubicacion = result;
            });
        };
        vm.types = "['establishment']";
        vm.placeChanged = function() {
            vm.place = this.getPlace();
            console.log('location', vm.place.geometry.location);
            vm.map.setCenter(vm.place.geometry.location);
            vm.ubicacion.latitud = vm.place.geometry.location.lat()
            vm.ubicacion.longitud = vm.place.geometry.location.lng()
        }
        NgMap.getMap().then(function(map) {
            vm.map = map;

        });

        vm.reRenderMap = function() {
            $timeout(function(){
                angular.forEach(vm.maps, function(ubicacion) {
                    google.maps.event.trigger(ubicacion, 'resize');
                });
            }, 200);
        }



        var onSaveSuccess = function (result) {
            $scope.$emit('jhipsterApp:ubicacionUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
            
        };

        var onSaveError = function () {
            vm.isSaving = false;
        };

        vm.save = function () {
            vm.isSaving = true;
            if (vm.ubicacion.id !== null) {
                Ubicacion.update(vm.ubicacion, onSaveSuccess, onSaveError);
            } else {
                Ubicacion.save(vm.ubicacion,onSaveSuccess, onSaveError);
            }
        };

        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
    }
})();
