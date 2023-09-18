export const environment = {
  production: false,
  apiURL: {
    base: 'http://localhost:8080',
    user: {
      registre: '/user/registre',
      login: '/user/login',
      manager: {
        filtred: '/manager/filter-by-email',
        delete: '/manager/delete-member-equipe',
        addDevs: '/manager/add-dev-to-manager',
        mangerEquipe: '/manager/get-devs-by-manager',
      },
      dev: {
        getManager: '/user/get-manager-by-dev',
        getFormation: '/dev/get-all',
        favoriteAddRemove: '/dev/add-remove-formation-favorites',
        numberFavoris: '/dev/get-number-favoris',
        numberAssinged: '/dev/get-number-assinged',
        numberEnCours: '/dev/get-number-en-cours',
        numberEnded: '/dev/get-number-ended',
        foramtionById: '/dev/get-formation-by-id',
        update: "/dev/update",
        getRecommended: '/dev/recommended',
        getFavoris: '/dev/favoris',
        getEnRelation: '/dev/en-relation',
        
      },
    },
    
    formation: {
      crud: {
        add: '/formation/add',
        update: '/formation/update',
        delete: '/formation/delete',
        getAll: '/formation/get-all',
        getById: '/formation/get-by-id',
        getPhoto:'/formation/get-photo',
      },
      inscription: {
        getConfirmed:'/dev/get-confirmed-inscriptions',
        getInscription:"/dev/confirm-inscription",
        confirm:"/manager/confirm-inscription",
        delete:"/manager/delete-inscription",
        enCours:"/dev/dev-formation-en-cours",
        termine:"/dev/dev-formation-ended",
        confirmFormation:"/manager/confirm-formation",
        getInscriptionByFormation: "/formation/get-inscriptions-by-formation"
      },
      preinscription: {
        inscrireFormation: '/dev/inscrire-formation',
        getPreIns: "/dev/get-pre-inscrits",
        delete:"/dev/delete-pre-inscription",
        getPreInscritForManager:'/formation/get-pre-inscription-by-formation',
      },
      filter: {
        name: '/formation/filter-by-name',
        desricption: '/formation/filter-by-description',
        entiteFormatrice: '/formation/filter-by-entite-formatrice',
      },
    
    },
    entiteFormatrice: {
      crud: {
        add: '/entite-formatrice/add',
        getAll: '/entite-formatrice/get-all',
        get: '/entite-formatrice/get-by-id',
        update: '/entite-formatrice/update',
        delete: '/entite-formatrice/delete',
        filterNom: '/entite-formatrice/filter-by-nom',
        filterDescription: '/entite-formatrice/filter-by-description',
      },
    },
    certif:{
      add:"/certif/add",
      getAll:"/certif/get-all",
      getPhoto:"/certif/get-photo",
      delete:"/certif/delete"
    }

  },
};
