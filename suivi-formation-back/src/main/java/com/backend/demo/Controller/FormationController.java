package com.backend.demo.Controller;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Set;

import com.backend.demo.DTO.DeveloppeurInscrit;
import com.backend.demo.DTO.ReturnedFormationToManager;
import com.backend.demo.Model.Developpeur;
import com.backend.demo.Service.ManagerService;
import org.springframework.beans.factory.annotation.Autowired;
import com.backend.demo.Model.Formation;
import com.backend.demo.Service.FormationService;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping(value = "/formation", method = { RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE,
        RequestMethod.PUT })
public class FormationController {


    final private FormationService formationService;
    final private ManagerService managerService;
    public FormationController(FormationService formationService,
            ManagerService managerService) {
        this.formationService = formationService;
        this.managerService = managerService;
    }
    @GetMapping("/filter-by-name")
    public List<ReturnedFormationToManager> filterFormationsByName(@RequestParam(name = "emailManager") String email,
                                                                   @RequestParam("filter") String filter) {
        System.out.println(formationService.filterFormationsByName(email, filter));
        return formationService.filterFormationsByName(email, filter);
    }

    @GetMapping("/filter-by-description")
    public List<ReturnedFormationToManager> filterFormationsByDescription(@RequestParam("emailManager") String email,
            @RequestParam("filter") String filter) {
        return formationService.filterFormationsByDescription(email, filter);
    }

    @GetMapping("/filter-by-entite-formatrice")
    public List<ReturnedFormationToManager> filterFormationsByEntiteFormatrice(@RequestParam("emailManager") String email,
            @RequestParam("filter") String filter) {
        return formationService.filterFormationsByEntiteFormatrice(email, filter);
    }

    @GetMapping("/get-all")
    public List<ReturnedFormationToManager> getAllFormations(@RequestParam("emailManager") String emailManager) {
        return formationService.getAllFormations(emailManager);
    }

    @PostMapping("/test")
    public void test(@RequestPart("test") String data) {
        System.out.println("test:"+data);
    }
    @PostMapping(value = "/add",consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public void addFormation(
            @RequestPart("nomFormation") String nomFormation,
            @RequestPart("categorie") String categorie,
            @RequestPart("nombrePlace") String nombrePlace,
            @RequestPart("description") String description,
            @RequestPart("dateDebut") String dateDebut,
            @RequestPart("duree") String duree,
            @RequestPart("entiteFormatrice") String entiteFormatrice,
            @RequestPart("emailManager") String emailManager,
            @RequestPart("idFormation") String idFormation,
            @RequestPart("photo") MultipartFile photo,
            @RequestParam("time") String time

            ) {
        HashMap<String,String> data=new HashMap<>();
        data.put("nomFormation",nomFormation);
        data.put("categorie",categorie);
        data.put("nombrePlace",nombrePlace);
        data.put("description",description);
        data.put("dateDebut",dateDebut);
        data.put("duree",duree);
        data.put("time",time);
        data.put("entiteFormatrice",entiteFormatrice);
        data.put("emailManager",emailManager);
        data.put("idFormation",idFormation);

        formationService.addFormation(data,photo);
    }

    @DeleteMapping("/delete")
    public void deleteFormation(@RequestParam Long id) {
        final String SUBJECT="Annulation de la Formation";
        Formation f=formationService.getById(id);
        Set<Developpeur> listDev=f.getInscriptions();
        listDev.addAll(f.getPreInscriptions());
        for(Developpeur d:f.getInscriptions()){
            String MSG="Cher "+d.getNom()+" "+d.getPrenom()+",\n" +
                    "\n" +
                    "Nous regrettons de vous informer que la formation "+f.getNomFormation()+" est malheureusement annulée.\n" +
                    "\n" +
                    "Nous travaillons activement pour reprogrammer la formation à une date ultérieure et nous vous tiendrons informé dès que nous aurons une nouvelle date confirmée.\n" +
                    "\n" +
                    "Si vous avez des questions ou besoin d'assistance, n'hésitez pas à nous contacter.\n" +
                    "\n" +
                    "Cordialement,\n" +
                    "L'équipe d'organisation des formations";
            managerService.sendEmail(d.getEmail(),SUBJECT,MSG);
        }
        formationService.deleteFormation(id);
    }

    @PutMapping("/update")
    public void updateFormation(@RequestBody Formation formation) {
        formationService.updateFormation(formation);
    }


    @GetMapping("/get-by-id")
    public ReturnedFormationToManager getFormationById(@RequestParam("id") Long id) {
        return formationService.getFormationById(id);
    }
    @GetMapping("/get-photo")
    public ResponseEntity<InputStreamResource> getPhoto(@RequestParam("idFormation") Long idFormation) throws IOException {
        Formation formation = formationService.getById(idFormation);
        String imagePath = "static/images/" + formation.getImage();
        ClassPathResource imageResource = new ClassPathResource(imagePath);

        if (!imageResource.exists()) {
            // Handle the case when the image does not exist.
            return ResponseEntity.notFound().build();
        }

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.IMAGE_JPEG);
        InputStreamResource inputStreamResource = new InputStreamResource(imageResource.getInputStream());

        return new ResponseEntity<>(inputStreamResource, headers, HttpStatus.OK);
    }

    @GetMapping("/get-inscriptions-by-formation")
    public List<DeveloppeurInscrit> getPreInscriptionByFormation(@RequestParam("idFormation") Long idFormation){
        return formationService.getInscriptions(idFormation);
    }


    @GetMapping("/get-pre-inscription-by-formation")
    public  List<DeveloppeurInscrit> getPreInscriptionsByFormation(@RequestParam("idFormation") Long idFormation){
        return formationService.getPreInscriptionsByFormation(idFormation);
    }

    @GetMapping("/state-formation")
    public boolean getState(@RequestParam("idFormation") Long id )
    {
        return formationService.getStateFormation(id);
    }


}
