package com.backend.demo.Service;

import java.io.File;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Set;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import com.backend.demo.DTO.DeveloppeurInscrit;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import com.backend.demo.DTO.ReturnedFormationToDev;
import com.backend.demo.DTO.ReturnedFormationToManager;
import com.backend.demo.Model.Developpeur;
import com.backend.demo.Model.EntiteFormatrice;
import com.backend.demo.Model.Formation;
import com.backend.demo.Model.Manager;
import com.backend.demo.Repository.FormationRepo;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Service
@EnableScheduling

public class FormationService {
    final private ManagerService managerService;
    final private FormationRepo formationRepo;
    final private EntiteFormatriceService entiteFormatriceService;
    final private DeveloppeurService developpeurService;
    private final ScheduledExecutorService executorService = Executors.newScheduledThreadPool(1);

    public FormationService(
            FormationRepo formationRepo,
            ManagerService managerService,
            EntiteFormatriceService entiteFormatriceService,
            DeveloppeurService developpeurService
    ){
        this.managerService=managerService;
        this.formationRepo=formationRepo;
        this.entiteFormatriceService=entiteFormatriceService;
        this.developpeurService=developpeurService;
        
    }

    public Formation getById(Long id){
        if(formationRepo.findById(id).isPresent()){
            return formationRepo.findById(id).get();
        }
        return null;
    }
    public boolean addFormation(HashMap<String, String> data, MultipartFile photo) {
        Formation formation = new Formation();
        String rootPath = System.getProperty("user.dir");
        String relativePath = "/src/main/resources/static/images/";
        String fullPath = rootPath + relativePath;
        Integer idEntite = Integer.valueOf( data.get("entiteFormatrice"));
        Long idFormation = Long.valueOf( data.get("idFormation"));
        String nomFormation =  data.get("nomFormation");
        String description =  data.get("description");
        LocalDate dateDebut = LocalDate.parse((String) data.get("dateDebut"));
        String categorie =  data.get("categorie");
        Integer duree = Integer.valueOf( data.get("duree"));
        String emailManager =  data.get("emailManager");
        String time =  data.get("time");
        System.out.println(time);
        Integer nombrePlace = Integer.valueOf(data.get("nombrePlace"));
        Manager manager = managerService.getManager(emailManager);
        if( idFormation!=0)
        {
            formation=getById(idFormation);
        }
        System.out.println("add:"+formation);
        EntiteFormatrice entiteFormatrice = entiteFormatriceService
                .getEntiteById(idEntite);
        formation.setNomFormation(nomFormation);
        formation.setDescription(description);
        formation.setDateDebut(dateDebut);
        formation.setCategorie(categorie);
        formation.setDuree(duree);
        formation.setTime(time);
        formation.setNombrePlace(nombrePlace);
        formation.setEntiteFormatrice(entiteFormatrice);
        formation.setManager(manager);
        formation.setImage(photo.getOriginalFilename());
        try {
            photo.transferTo(new File(fullPath+ photo.getOriginalFilename()));
        } catch (Exception e) {
            System.out.println("error:" + e.getMessage());
        }
        formationRepo.save(formation);
        entiteFormatrice.addFormation(formation);
        entiteFormatriceService.addEntiteFormatrice(entiteFormatrice);
        manager.addFormation(formation);
        managerService.saveManager(manager);
        return true;
    }
    public ReturnedFormationToManager getFormationById(Long idF)
    {
        if(formationRepo.findById(idF).isPresent())
        {
            Formation f=formationRepo.findById(idF).get();
            return new ReturnedFormationToManager(
                    f.getIdFormation(),
                    f.getNomFormation(),
                    f.getNombrePlace(),
                    f.getDuree(),
                    f.getDateDebut(),
                    f.getCategorie(),
                    f.getDescription(),
                    f.getEntiteFormatrice().getNomEntite(),
                    f.getNumberSendedEmail()>0,
                    f.getPreInscriptions().size()
            );
        }
        return null;
    }


    public ReturnedFormationToDev getFormationByIdForDev(Long id){
        if(formationRepo.findById(id).isPresent())
        {
            Formation f=formationRepo.findById(id).get();
            return new ReturnedFormationToDev(
                    f.getIdFormation(),
                    f.getNomFormation(),
                    f.getNombrePlace(),
                    f.getDuree(),
                    f.getDateDebut(),
                    f.getCategorie(),
                    f.getDescription(),
                    f.getEntiteFormatrice().getNomEntite(),
                    false,
                    f.getTime(),
                    false
            );
        }
        return null;
    }

    public void deleteFormation(Long id) {
        if(formationRepo.findById(id).isPresent())
        {
            Formation f=formationRepo.findById(id).get();
            Manager m=f.getManager();
            m.deleteFormation(id);
            managerService.saveManager(m);
            f.setManager(null);
            EntiteFormatrice e=f.getEntiteFormatrice();
            e.deleteFormation(f);
            f.setEntiteFormatrice(null);
            f.setInscriptions(null);
            f.setPreInscriptions(null);
            formationRepo.deleteById(id);
        }


    }

    public List<ReturnedFormationToManager> getAllFormations(String emailManager) {
        if (managerService.isPresentManager(emailManager)){

            Manager manager = managerService.getManager(emailManager);
            return manager.getMyFomrations().stream().map((Formation f)->
                    new ReturnedFormationToManager(
                            f.getIdFormation(),
                            f.getNomFormation(),
                            f.getNombrePlace(),
                            f.getDuree(),
                            f.getDateDebut(),
                            f.getCategorie(),
                            f.getDescription(),
                            f.getEntiteFormatrice().getNomEntite(),
                            f.getNumberSendedEmail()>0,
                            f.getPreInscriptions().size()

                    )
            ).toList();
        }
        return new ArrayList<ReturnedFormationToManager>();
    }

    public List<ReturnedFormationToManager> filterFormationsByName(String email, String filter) {
        if (managerService.isPresentManager(email)) {

            Manager manager = managerService.getManager(email);
            return  manager.getMyFomrations().stream().filter((formation) -> {
                return formation.getNomFormation().toLowerCase().contains(filter.toLowerCase());
            }).map((Formation f)->
                    new ReturnedFormationToManager(
                            f.getIdFormation(),
                            f.getNomFormation(),
                            f.getNombrePlace(),
                            f.getDuree(),
                            f.getDateDebut(),
                            f.getCategorie(),
                            f.getDescription(),
                            f.getEntiteFormatrice().getNomEntite(),
                            f.getNumberSendedEmail()>0,
                            f.getPreInscriptions().size()

                    )
            ).toList();
        }
        System.out.println(email+filter);
        return new ArrayList<ReturnedFormationToManager>();
    }

    public List<ReturnedFormationToManager> filterFormationsByDescription(String email, String filter) {

        if (managerService.isPresentManager(email)) {
            Manager manager = managerService.getManager(email);
            return  manager.getMyFomrations().stream().filter((formation) -> {
                return formation.getDescription().toLowerCase().contains(filter.toLowerCase());
            }).map((Formation f)->
                    new ReturnedFormationToManager(
                            f.getIdFormation(),
                            f.getNomFormation(),
                            f.getNombrePlace(),
                            f.getDuree(),
                            f.getDateDebut(),
                            f.getCategorie(),
                            f.getDescription(),
                            f.getEntiteFormatrice().getNomEntite(),
                            f.getNumberSendedEmail()>0,
                            f.getPreInscriptions().size()

                    )
            ).toList();
        }
        return new ArrayList<ReturnedFormationToManager>();
    }

    public List<ReturnedFormationToManager> filterFormationsByEntiteFormatrice(String email, String filtre) {

        if (managerService.isPresentManager(email)) {
            Manager manager = managerService.getManager(email);
            return manager.getMyFomrations().stream().filter((formation) -> {
                return formation.getEntiteFormatrice().getNomEntite().toLowerCase().contains(filtre.toLowerCase());
            }).map((Formation f)->
                    new ReturnedFormationToManager(
                            f.getIdFormation(),
                            f.getNomFormation(),
                            f.getNombrePlace(),
                            f.getDuree(),
                            f.getDateDebut(),
                            f.getCategorie(),
                            f.getDescription(),
                            f.getEntiteFormatrice().getNomEntite(),
                            f.getNumberSendedEmail()>0,
                            f.getPreInscriptions().size()

                    )
            ).toList();
        }
        return new ArrayList<ReturnedFormationToManager>();

    }

    public void updateFormation(Formation formation) {
        formationRepo.save(formation);
    }


    public List<ReturnedFormationToDev> getFormationForDev(String emailDev,String emailManager){
        Manager m=managerService.getManager(emailManager);
        Developpeur d=developpeurService.getDeveloppeur(emailDev);
        List<Formation> formationsManager=m.getMyFomrations().stream().filter(
                (Formation f)->{
                    return f.getDateDebut().isAfter(LocalDate.now()) && f.getNumberSendedEmail()==0 && f.getNombrePlace()>f.getInscriptions().size();
                }
        ).toList();

        List<Formation> favorisDeveloppeur=d.getMyFavoris();
        return formationsManager.stream().filter(
                (Formation f)-> {
                    return ! f.getPreInscriptions().contains(d)  &&  !f.getInscriptions().contains(d) ;
                }
        ).map(f ->
                new ReturnedFormationToDev(
                        f.getIdFormation(),
                        f.getNomFormation(),
                        f.getNombrePlace(),
                        f.getDuree(),
                        f.getDateDebut(),
                        f.getCategorie(),
                        f.getDescription(),
                        f.getEntiteFormatrice().getNomEntite(),
                        favorisDeveloppeur.contains(f),
                        f.getTime(),
                        false
                )
        ).toList();
    }

    public List<ReturnedFormationToDev> getFavoris(String emailDev){
        Developpeur d=developpeurService.getDeveloppeur(emailDev);
        return d.getMyFavoris().stream().filter(formation -> {
            return ! formation.getInscriptions().contains(d);
        }).map(
                formation ->
                    new ReturnedFormationToDev(
                            formation.getIdFormation(),
                            formation.getNomFormation(),
                            formation.getNombrePlace(),
                            formation.getDuree(),
                            formation.getDateDebut(),
                            formation.getCategorie(),
                            formation.getDescription(),
                            formation.getEntiteFormatrice().getNomEntite(),
                            true,
                            formation.getTime(),
                            false
                    )
        ).toList();
    }
    public List<Formation> getAllFormations(){
        return formationRepo.findAll();
    }

    public List<ReturnedFormationToDev> getFormationsAssigneConfirme(String emailDev){
        Developpeur d=developpeurService.getDeveloppeur(emailDev);
        return getAllFormations().stream().filter(
                f->
                        f.getInscriptions().contains(d) && f.getNumberSendedEmail()>0 && f.getDateDebut().isAfter(LocalDate.now())
                ).map(
                formation ->
                    new ReturnedFormationToDev(
                            formation.getIdFormation(),
                            formation.getNomFormation(),
                            formation.getNombrePlace(),
                            formation.getDuree(),
                            formation.getDateDebut(),
                            formation.getCategorie(),
                            formation.getDescription(),
                            formation.getEntiteFormatrice().getNomEntite(),
                            false,
                            formation.getTime(),
                            true
                    )
        ).toList();
    }

    public List<ReturnedFormationToDev> getEndFormations(String emailDev){
        Developpeur d=developpeurService.getDeveloppeur(emailDev);
        return getAllFormations().stream().filter(
                f-> {

                    return  f.getInscriptions().contains(d) &&
                            f.getNumberSendedEmail() > 1 &&
                            (f.getDateDebut().plusDays(f.getDuree()-1).isBefore(LocalDate.now()) ||
                                    f.getDateDebut().plusDays(f.getDuree()-1).isEqual(LocalDate.now()));}
                    ).map(
                formation ->
                        new ReturnedFormationToDev(
                                formation.getIdFormation(),
                                formation.getNomFormation(),
                                formation.getNombrePlace(),
                                formation.getDuree(),
                                formation.getDateDebut(),
                                formation.getCategorie(),
                                formation.getDescription(),
                                formation.getEntiteFormatrice().getNomEntite(),
                                false,
                                formation.getTime(),
                                true
                        )

        ).toList();
    }

    public List<ReturnedFormationToDev> getFormationEncours(String emailDev){
        Developpeur d=developpeurService.getDeveloppeur(emailDev);
        return getAllFormations().stream().filter(
                f->
                {
                    return f.getInscriptions().contains(d) && f.getNumberSendedEmail()>1 &&  (f.getDateDebut().isBefore(LocalDate.now())||f.getDateDebut().isEqual(LocalDate.now())) && f.getDateDebut().plusDays(f.getDuree()-1).isAfter(LocalDate.now());
                }
        ).map(
                formation ->
                        new ReturnedFormationToDev(
                                formation.getIdFormation(),
                                formation.getNomFormation(),
                                formation.getNombrePlace(),
                                formation.getDuree(),
                                formation.getDateDebut(),
                                formation.getCategorie(),
                                formation.getDescription(),
                                formation.getEntiteFormatrice().getNomEntite(),
                                false,
                                formation.getTime(),
                                true
                        )

        ).toList();
    }


    public  boolean addRemoveFormationFavoritesForDev(String emailDev,Long idFormation){
        boolean test=false;
        Developpeur d=developpeurService.getDeveloppeur(emailDev);
        Formation f=getById(idFormation);

        if(d.getMyFavoris().contains(f)){
            d.deleteFormationFavorites(f);
        }
        else{
            d.addFormationFavorites(f);
            test= true;
        }
        developpeurService.saveDeveloppeur(d);
        formationRepo.save(f);
        return test;
    }

    public DeveloppeurService getDeveloppeurService() {
        return developpeurService;
    }

    public Integer getNumberFavoris(String emailDev){
        Developpeur d=developpeurService.getDeveloppeur(emailDev);
        return d.getMyFavoris().size();
    }

    public Integer getNumberEnCours(String emailDev) {
        return getFormationEncours(emailDev).size();
    }

    public Integer getNumberEnd(String emailDev) {
        return getEndFormations(emailDev).size();
    }

    /*public Integer getNumberAssigne(String emailDev) {
        return getFormationsAssigne(emailDev).size();
    }*/

    public List<ReturnedFormationToDev> getRecommended(String emailDev,String emailManager) {
        Manager m=managerService.getManager(emailManager);
        Developpeur d=developpeurService.getDeveloppeur(emailDev);
        List<Formation> formationsManager=m.getMyFomrations().stream().filter(
                (Formation f)->{
                    return f.getDateDebut().isAfter(LocalDate.now()) && f.getNumberSendedEmail()==0 && f.getNombrePlace()>f.getInscriptions().size();
                }
        ).toList();
        return formationsManager.stream().filter(
                f->  !f.getPreInscriptions().contains(d)    &&  !f.getInscriptions().contains(d) &&  f.getDateDebut().isAfter(LocalDate.now()) && d.getCategories().contains(f.getCategorie())
        ).map(f ->
                new ReturnedFormationToDev(
                        f.getIdFormation(),
                        f.getNomFormation(),
                        f.getNombrePlace(),
                        f.getDuree(),
                        f.getDateDebut(),
                        f.getCategorie(),
                        f.getDescription(),
                        f.getEntiteFormatrice().getNomEntite(),
                        false,
                        f.getTime(),
                        false
                )
        ).toList();
    }

    public List<ReturnedFormationToDev> getFormationEnRelation(String emailManager,String emailDev,String categorie){
        List<ReturnedFormationToDev> formations=getFormationForDev(emailDev,emailManager);
        return formations.stream().filter(f->f.getCategorie().equals(categorie)).toList();
    }

    public void preInscrireFormation(String emailDev, Long idFormation) {
        Developpeur d=developpeurService.getDeveloppeur(emailDev);
        Formation f=getById(idFormation);
        f.addDeveloppeurPreInscrit(d);
        formationRepo.save(f);
    }

    public List<ReturnedFormationToDev> getPreInscription(String emailDev){
        Developpeur d=developpeurService.getDeveloppeur(emailDev);
        return getAllFormations().stream().filter(
                formation ->
                        formation.getPreInscriptions().contains(d)
        ).map(
                formation ->
                    new ReturnedFormationToDev(
                            formation.getIdFormation(),
                            formation.getNomFormation(),
                            formation.getNombrePlace(),
                            formation.getDuree(),
                            formation.getDateDebut(),
                            formation.getCategorie(),
                            formation.getDescription(),
                            formation.getEntiteFormatrice().getNomEntite(),
                            false,
                            formation.getTime(),
                            false
                    )
        ).toList();
    }

    public void deletePreInscrit(String emailDev, Long idFormation) {
        final String SUBJECT="Refus de votre pré-inscription";
        Developpeur d=developpeurService.getDeveloppeur(emailDev);
        Formation f=getById(idFormation);
        final String MSG=
                "Cher "+d.getNom()+" "+d.getPrenom()+",\n" +
                "\n" +
                "Nous avons bien reçu votre demande d'inscription à la formation "+f.getNomFormation()+". \n" +
                "Néanmoins, nous ne pourrons pas donner suite à votre demande en raison du nombre limité de places disponibles.\n" +
                "\n" +
                "Nous vous remercions par ailleurs de votre intérêt.\n" +
                "\n" +
                "Bien cordialement,\n" +
                "\n" +
                "L’équipe Formation.\n";
        f.deleteDeveloppeurPreInscrit(d);
        formationRepo.save(f);
        managerService.sendEmail(d.getEmail(),SUBJECT,MSG);
    }


    public List<DeveloppeurInscrit> getPreInscriptionsByFormation(Long idFormation){
        Formation f=getById(idFormation);
        return f.getPreInscriptions().stream().map(
                dev->
                        new DeveloppeurInscrit(
                                dev.getNom(),
                                dev.getPrenom(),
                                dev.getEmail(),
                                dev.getNumero()
                        )
        ).toList();
    }

    public void preConfirmInscription(String email,Long idFormation){
        Developpeur d=developpeurService.getDeveloppeur(email);
        Formation f=formationRepo.findById(idFormation).get();
        f.addInscription(d);
        formationRepo.save(f);
    }
    public List<DeveloppeurInscrit> getInscriptions(Long idFormation){
        Formation f=getById(idFormation);

        return f.getInscriptions().stream().map(
                dev->
                        new DeveloppeurInscrit(
                                dev.getNom(),
                                dev.getPrenom(),
                                dev.getEmail(),
                                dev.getNumero()
                        )
        ).toList();
    }


    public void confirmInscription(String emailDev, Long idFormation) {
        Developpeur d=developpeurService.getDeveloppeur(emailDev);
        Formation f=getById(idFormation);
        final String SUBJECT="Pré-inscription Acceptée!";
        final String MSG="Cher "+d.getNom()+" "+d.getPrenom()+ "\n"
                +"Félicitations! Votre pré-inscription pour la formation "+f.getNomFormation()+" a été acceptée.\n" +
                "\n" +
                "Restez à l'affût de votre boîte de réception pour la confirmation finale avec tous les détails.\n" +
                "Cordialement,\n" +
                "L'équipe des formations\n";

        f.addInscription(d);
        f.deleteDeveloppeurPreInscrit(d);
        formationRepo.save(f);

        managerService.sendEmail(d.getEmail(),SUBJECT,MSG);

    }

    public List<ReturnedFormationToDev>  getInscriptionsForDev(String email){
        Developpeur d=developpeurService.getDeveloppeur(email);
        return  getAllFormations().stream().filter(
                formation ->
                        formation.getInscriptions().contains(d)

        ).map(
                formation -> new ReturnedFormationToDev(
                        formation.getIdFormation(),
                        formation.getNomFormation(),
                        formation.getNombrePlace(),
                        formation.getDuree(),
                        formation.getDateDebut(),
                        formation.getCategorie(),
                        formation.getDescription(),
                        formation.getEntiteFormatrice().getNomEntite(),
                        false,
                        formation.getTime(),
                        true
                )
        ).toList();
    }

    @Scheduled(fixedRate =10000000 )
    @Transactional
    public void scheduleSendEmail() {
        List<Formation> formations = formationRepo.findAll();
        List<Formation> formationsToSendEmails = formations.stream().filter(
                f -> f.getNumberSendedEmail() == 1
        ).toList();
        for (Formation f : formationsToSendEmails) {
            System.out.println("Sending email to " + f.getNomFormation());
            Set<Developpeur> developpeurs = f.getInscriptions();
            executeOperation(developpeurs,f);
            f.setNumberSendedEmail((short) 2);
            formationRepo.save(f);
        }
    }
//    timer.schedule(new TimerTask() {
//        @Override
//        public void run() {
//            emailSender.sendEmail();
//        }
//    }, reminderTime.getTime());

    public void executeOperation(Set<Developpeur> devs,Formation f) {
        final String SUBJECT = "Rappel - Formation Demain";
        for (Developpeur d : devs) {
            final String MSG = "Cher(e) "+d.getNom()+" "+d.getPrenom()+",\n" +
                    "\n" +
                    "Nous souhaitons vous rappeler avec enthousiasme que demain se tiendra une formation cruciale sur "+f.getNomFormation()+" . C'est une occasion d'approfondir vos compétences et de vous perfectionner dans ce domaine.\n" +
                    "\n" +
                    "Date: "+f.getDateDebut()+"\n" +
                    "\n" +
                    "Nous avons tout mis en place pour vous offrir une expérience enrichissante et conviviale. Des experts chevronnés animeront la formation, prêts à partager leur savoir avec vous.\n" +
                    "\n" +
                    "Nous comptons sur votre présence pour contribuer à la réussite de cet événement. Veuillez marquer cette date dans votre agenda et vous joindre à nous.\n" +
                    "\n" +
                    "N'hésitez pas à nous contacter si vous avez des questions ou des besoins particuliers. Nous sommes là pour vous aider.\n" +
                    "\n" +
                    "À demain, avec le sourire!\n" +
                    "\n" +
                    "L'équipe d'organisation de la formation\n";
            managerService.sendEmail(d.getEmail(), SUBJECT, MSG);
        }
    }
    public void deleteInscription(String emailDev, Long idFormation) {
        Formation f=getById(idFormation);
        Developpeur d=developpeurService.getDeveloppeur(emailDev);
        final String SUBJECT="Refuse de votre pré-inscription";
        final String MSG="Cher "+d.getNom()+" "+d.getPrenom()+",\n" +
                "\n" +
                "Nous avons bien reçu votre demande d'inscription à la formation "+f.getNomFormation()+". Malheureusement, nous ne pourrons pas donner suite à votre candidature cette fois-ci en raison du nombre limité de places disponibles.\n" +
                "\n" +
                "Nous vous remercions pour votre intérêt et vous encourageons à explorer d'autres opportunités de formation adaptées à vos besoins.\n" +
                "\n" +
                "Cordialement,\n" +
                "L'équipe des formations\n";
        managerService.sendEmail(d.getEmail(),SUBJECT,MSG);
        f.removeInscription(d);
        formationRepo.save(f);
    }



   public void confirmFormation(Long idFormation){
        Formation formation=getById(idFormation);
        formation.setNumberSendedEmail((short) 1);
        formation.setPreInscriptions(null);
        System.out.println("formation: "+formation);
        final String SUBJECT="Confirmation de Participation à la Formation\n";
        for(Developpeur d: formation.getInscriptions())
        {
            final String MSG="Cher "+d.getNom()+" "+d.getPrenom()+",\n" +
                    "\n" +
                    "Nous confirmons votre participation à la formation sur "+formation.getNomFormation()+ ".\n" +
                    "\n" +
                    "Date:"+formation.getDateDebut()+" \n" +
                    "Heure de Début:"+formation.getTime()+" \n" +
                    "Nombre de Séances:"+formation.getDuree()+"\n" +
                    "\n" +
                    "À bientôt!\n" +
                    "\n" +
                    "L'équipe des formations\n";
            managerService.sendEmail(d.getEmail(),SUBJECT,MSG);
        }
        formationRepo.save(formation);
   }

   public boolean getStateFormation(Long idFormation){
        return getById(idFormation).getNumberSendedEmail()==2;
   }

}
