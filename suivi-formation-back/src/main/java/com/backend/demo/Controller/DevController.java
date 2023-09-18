package com.backend.demo.Controller;

import com.backend.demo.DTO.ReturnedDev;
import com.backend.demo.DTO.ReturnedFormationToDev;
import com.backend.demo.DTO.ReturnedFormationToManager;
import com.backend.demo.Service.DeveloppeurService;
import com.backend.demo.Service.FormationService;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping(value = "/dev",method = {RequestMethod.GET,RequestMethod.POST,RequestMethod.DELETE,RequestMethod.PUT})

public class DevController {
    private final FormationService formationService;
    private final DeveloppeurService devService;
    public DevController(
            FormationService formationService,
            DeveloppeurService devService
    ){
        this.formationService=formationService;
        this.devService=devService;
    }

    @GetMapping("/get-all")
    public List<ReturnedFormationToDev> getFormationForDev(@RequestParam("emailDev") String emailDev, @RequestParam("emailManager") String emailManager){
        return formationService.getFormationForDev(emailDev,emailManager);
    }

    @GetMapping("/dev-formation-favorites")
    public List<ReturnedFormationToDev> getFormationFavoritesForDev(@RequestParam("emailDev") String emailDev){
        return formationService.getFavoris(emailDev);
    }

    @GetMapping("/dev-formation-inscriptions")
    public List<ReturnedFormationToDev> getFormationInscriptionsForDev(@RequestParam("emailDev") String emailDev){
        return formationService.getFormationsAssigneConfirme(emailDev);
    }

    @GetMapping("/dev-formation-en-cours")
    public List<ReturnedFormationToDev> getFormationForManager(@RequestParam("emailDev") String emailDev){
        return formationService.getFormationEncours(emailDev);
    }

    @GetMapping("/dev-formation-ended")
    public List<ReturnedFormationToDev> getEndedFormation(@RequestParam("emailDev") String emailManager){
        return formationService.getEndFormations(emailManager);
    }

    @PostMapping("/add-remove-formation-favorites")
    public boolean addFormationFavoritesForDev(@RequestParam("emailDev") String emailDev, @RequestParam("idFormation") Long idFormation){
        return formationService.addRemoveFormationFavoritesForDev(emailDev,idFormation);
    }

    @GetMapping("/get-number-favoris")
    public Integer getNumberFavoris(@RequestParam("emailDev") String emailDev){
        return formationService.getNumberFavoris(emailDev);
    }

    @GetMapping("/get-number-en-cours")
    public Integer getNumberEnCours(@RequestParam("emailDev") String emailDev){
        return formationService.getNumberEnCours(emailDev);
    }

    @GetMapping("/get-number-ended")
    public Integer getNumberEnd(@RequestParam("emailDev") String emailDev){
        return formationService.getNumberEnd(emailDev);
    }

    /*@GetMapping("/get-number-assigne")
    public Integer getNumberAssigne(@RequestParam("emailDev") String emailDev){
        return formationService.getNumberAssigne(emailDev);
    }*/
    @GetMapping("/get-formation-by-id")
    public ReturnedFormationToDev getFormationById(@RequestParam("idFormation") Long idFormation){
        return formationService.getFormationByIdForDev(idFormation);
    }

    @GetMapping("")
    public ReturnedDev getDev(@RequestParam("emailDev") String emailDev){
        return devService.getDevForUpdate(emailDev);
    }

    @PutMapping("/update")
    public void updateDev(@RequestBody HashMap<String,Object>d){
        devService.update(d);
    }

    @GetMapping("/recommended")
    public List<ReturnedFormationToDev> getRecommended(@RequestParam("emailDev") String emailDev,@RequestParam("emailManager") String emailManager){
        return formationService.getRecommended(emailDev,emailManager);
    }

    @GetMapping("/favoris")
    public List<ReturnedFormationToDev> getFavoris(@RequestParam("emailDev") String emailDev){
        return formationService.getFavoris(emailDev);

    }

    @GetMapping("/en-relation")
    public List<ReturnedFormationToDev> getEnRelations(@RequestParam("emailManager") String emailManager,@RequestParam("emailDev") String emailDev,@RequestParam("categorie") String categorie){
        System.out.println("emailManager : "+emailManager+" emailDev : "+emailDev+" categorie : "+categorie);
        return formationService.getFormationEnRelation(emailManager,emailDev,categorie);
    }

    @PostMapping("/inscrire-formation")
    public void inscrireFormation(@RequestParam("emailDev") String emailDev,@RequestParam("idFormation") Long idFormation){
        formationService.preInscrireFormation(emailDev,idFormation);
    }

    @GetMapping("/get-pre-inscrits")
    public List<ReturnedFormationToDev> getPreInscrits(@RequestParam("emailDev") String emailDev){
        return formationService.getPreInscription(emailDev);
    }

    @DeleteMapping("/delete-pre-inscription")
    public void deletePreInscrit(@RequestParam("emailDev") String emailDev,@RequestParam("idFormation") Long idFormation){
        formationService.deletePreInscrit(emailDev,idFormation);
    }

    @GetMapping("/get-confirmed-inscriptions")
    public List<ReturnedFormationToDev> getInscriptions(@RequestParam("emailDev") String emailDev){
        return formationService.getInscriptionsForDev(emailDev);
    }



}
