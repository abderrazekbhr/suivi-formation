package com.backend.demo.Service;

import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;

@Getter
@Setter
public class ServiceProvider {
    public final ManagerService managerService;
    public final DeveloppeurService developpeurService;
    public final EntiteFormatriceService entiteFormatriceService;
    public final FormationService formationService;
    public final UserService userService;
    @Autowired
    public ServiceProvider(
            ManagerService managerService,
            DeveloppeurService developpeurService,
            EntiteFormatriceService entiteFormatriceService,
            FormationService formationService,
            UserService userService
    ) {
        this.managerService = managerService;
        this.developpeurService = developpeurService;
        this.entiteFormatriceService = entiteFormatriceService;
        this.formationService = formationService;
        this.userService = userService;
    }
}
