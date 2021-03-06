(function() {
    'use strict';

    angular
        .module('jhipsterApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('precio', {
            parent: 'entity',
            url: '/precio',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'jhipsterApp.precio.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/precio/precios.html',
                    controller: 'PrecioController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('precio');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('precio-detail', {
            parent: 'entity',
            url: '/precio/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'jhipsterApp.precio.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/precio/precio-detail.html',
                    controller: 'PrecioDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('precio');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'Precio', function($stateParams, Precio) {
                    return Precio.get({id : $stateParams.id});
                }]
            }
        })
        .state('precio.new', {
            parent: 'precio',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/precio/precio-dialog.html',
                    controller: 'PrecioDialogController2',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                precio: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('precio', null, { reload: true });
                }, function() {
                    $state.go('precio');
                });
            }]
        })
        .state('precio.edit', {
            parent: 'precio',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/precio/precio-dialog.html',
                    controller: 'PrecioDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Precio', function(Precio) {
                            return Precio.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('precio', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('precio.delete', {
            parent: 'precio',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/precio/precio-delete-dialog.html',
                    controller: 'PrecioDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Precio', function(Precio) {
                            return Precio.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('precio', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        })
            // Crear precio asociado a una cerveza en el perfil de esta
            .state('nuevoprecioperfil', {
                parent: 'home',
                url: '/{idCerveza}/newPrecioCerveza',
                data: {
                    authorities: ['ROLE_USER']
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'app/entities/precio/precio-dialog3.html',
                        controller: 'PrecioDialogController2',
                        controllerAs: 'vm',
                        backdrop: 'static',
                        size: 'lg',
                        resolve: {
                            translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                                $translatePartialLoader.addPart('precio');
                                return $translate.refresh();
                            }],
                            entity: ['Cervesa', function(Cervesa) {
                                return {
                                    precio: null,
                                    id: null,
                                    //cervesa: $stateParams.idCerveza
                                    cervesa: Cervesa.get({id : $stateParams.idCerveza})
                                };
                            }]

                        }
                    }).result.then(function() {
                        $state.go('home', null, { reload: true });
                    }, function() {
                        $state.go('home');
                    });
                }]
            })
            // CREAR PRECIO DESPUES DE LA UBICACION
            .state('nuevoprecio', {
                parent: 'home',
                url: '/{idCerveza}/{idUbicacion}/newPrecio',
                data: {
                    authorities: ['ROLE_USER']
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'app/entities/precio/precio-dialog2.html',
                        controller: 'PrecioDialogController',
                        controllerAs: 'vm',
                        backdrop: 'static',
                        size: 'lg',
                        resolve: {
                            translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                                $translatePartialLoader.addPart('precio');
                                return $translate.refresh();
                            }],
                            entity: ['Cervesa', function(Cervesa) {
                                return {
                                    precio: null,
                                    id: null,
                                    //cervesa: $stateParams.idCerveza
                                    cervesa: Cervesa.get({id : $stateParams.idCerveza})
                                };
                            }],
                            ubicacion: ['Ubicacion', function(Ubicacion) {

                                    //cervesa: $stateParams.idCerveza
                                 return Ubicacion.get({id : $stateParams.idUbicacion});

                            }]

                        }
                    }).result.then(function() {
                        $state.go('home', null, { reload: true });
                    }, function() {
                        $state.go('home');
                    });
                }]
            });
    }

})();
