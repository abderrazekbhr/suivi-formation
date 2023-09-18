package com.backend.demo.Service;

import com.backend.demo.DTO.ReturnedDev;
import com.backend.demo.DTO.ReturnedFormationToDev;
import com.backend.demo.Model.Developpeur;
import com.backend.demo.Repository.DeveloppeurRepo;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;

@Service
public class DeveloppeurService {
    final private DeveloppeurRepo developpeurRepo;


    public DeveloppeurService(
            DeveloppeurRepo developpeurRepo

    ){
        this.developpeurRepo=developpeurRepo;
    }
    public Developpeur getDeveloppeur(String email) {
        if(developpeurRepo.findById(email).isPresent()){
            Developpeur d= developpeurRepo.findById(email).get();
            return d;
        }
        return null;
    }

    public ReturnedDev getDevForUpdate(String email){
        Developpeur d=getDeveloppeur(email);
        return new ReturnedDev(
                d.getNom(),
            d.getPrenom(),
            d.getNumero(),
            d.getPassword(),
            d.getCategories()
        );

    }

    public void update(HashMap<String,Object> data) {
        System.out.println(data);
        Developpeur d=getDeveloppeur((String) data.get("email"));
        d.setCategories((List<String>) data.get("categories"));
        d.setNom((String) data.get("nom"));
        d.setPrenom((String) data.get("prenom"));
        d.setPassword((String) data.get("password"));
        d.setNumero((String) data.get("numero"));
        saveDeveloppeur(d);
    }
/*
    public List<ReturnedFormationToDev> getInscriptions(String email){



        Developpeur d=getDeveloppeur(email);
        return d.getInscriptionOfDev().stream().map(
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
*/
    public void saveDeveloppeur(Developpeur developpeur){
        developpeurRepo.save(developpeur);
    }

    public List<Developpeur> getAllDeveloppeur(){
        return developpeurRepo.findAll();
    }


}
