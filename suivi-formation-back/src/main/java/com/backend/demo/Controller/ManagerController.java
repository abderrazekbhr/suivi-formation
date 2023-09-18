package com.backend.demo.Controller;

import com.backend.demo.DTO.Email;
import com.backend.demo.Model.Developpeur;
import com.backend.demo.Model.Manager;
import com.backend.demo.Model.User;
import com.backend.demo.Service.DeveloppeurService;
import com.backend.demo.Service.FormationService;
import com.backend.demo.Service.ManagerService;
import com.backend.demo.Service.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping(value = "/manager",method = {RequestMethod.GET,RequestMethod.POST,RequestMethod.DELETE,RequestMethod.PUT})

public class ManagerController {
    public record BodyRequestAddDevToManager(String emailManager, ArrayList<String> emailsDev) {
    }
    final private  FormationService formationService;
    final private  UserService userService;
    final private ManagerService managerService;
    final private  DeveloppeurService developpeurService;
    public ManagerController(
            UserService userService,
            FormationService formationService,
            ManagerService managerService,
            DeveloppeurService developpeurService
    ){
        this.userService=userService;
        this.developpeurService=developpeurService;
        this.managerService=managerService;
        this.formationService=formationService;
    }
    @GetMapping("/get-users")
    public List<User> getAllUsers() {
        return userService.getUsers();
    }

    @GetMapping("/filter-by-email")
    public List<UserService.FiltredDev> filterByEmail(@RequestParam String emailManager, @RequestParam String emailDev) {
        return userService.filterByEmail(emailManager, emailDev);
    }

    @PostMapping("/add-dev-to-manager")
    public boolean addDevToManager(@RequestBody BodyRequestAddDevToManager data) {
        Manager m= managerService.getManager(data.emailManager);
        for (String emailD : data.emailsDev) {
            Developpeur dev = developpeurService.getDeveloppeur(emailD);
            dev.setManager(managerService.getManager(data.emailManager));
            developpeurService.saveDeveloppeur(dev);
            final String MSG =
                    "Félicitations! Vous faites désormais partie de l'équipe de "+m.getNom() +" "+m.getPrenom()+".\n" +
                    "\n" +
                    "Nous comptons sur votre expertise pour renforcer notre équipe et atteindre de nouveaux sommets.\n" +
                    "\n" +
                    "Bienvenue à bord!\n" +
                    "\n" +
                    "Cordialement,\n" +
                    "L'équipe de direction";
            final String SUBJECT = "Bienvenue "+ dev.getNom()+" "+ dev.getPrenom();

            managerService.sendEmail(emailD, SUBJECT, MSG);
        }
        return userService.addDevToManager(data.emailManager, data.emailsDev);

    }

    @GetMapping("/get-devs-by-manager")
    public List<String> getDevOfEquipe(@RequestParam String emailManager) {
        return userService.getEmailsOfDevInTheEquipe(emailManager);
    }

    @DeleteMapping("/delete-member-equipe")
    public boolean deleteMemberEquipe(@RequestParam String emailManager, @RequestParam String emailDev) {
        Developpeur dev = developpeurService.getDeveloppeur(emailDev);
        Manager m= managerService.getManager(emailManager);
        final String SUBJECT = "Changement d'équipe - Information importante";
        final String MSG = "Cher " + dev.getNom()+" " +dev.getPrenom() +",\n" +
                "\n" +
                "Je tenais à vous serez affecté(e) à une autre équipe au sein de l'entreprise."+
                "\n"+
                " Vous ne ferez plus partie de l'équipe de "+m.getNom() +" "+m.getPrenom()+".\n" +
                "\n" +
                "Merci pour votre compréhension.\n" +
                "\n" +
                "Cordialement,";

        managerService.sendEmail(dev.getEmail(), SUBJECT, MSG);

        return userService.deleteMemberEquipe(emailManager, emailDev);
    }

    @PostMapping("/confirm-inscription")
    public void confirmInscription(@RequestParam("emailDev") String emailDev,@RequestParam("idFormation") Long idFormation){
        formationService.confirmInscription(emailDev,idFormation);
    }

    @DeleteMapping("/delete-inscription")
    public void deleteInscription(@RequestParam("emailDev") String emailDev,@RequestParam("idFormation") Long idFormation)
    {
        formationService.deleteInscription(emailDev,idFormation);
    }
    @PostMapping("/send-mail")
    public void sendMail(@RequestBody Email email){
        managerService.sendEmail(email.getEmail(),email.getSubject(),email.getMessage());
    }

    @PostMapping("/confirm-formation")
    public void confirmFormations(@RequestParam("idFormation") Long id){
        formationService.confirmFormation(id);
    }

}
