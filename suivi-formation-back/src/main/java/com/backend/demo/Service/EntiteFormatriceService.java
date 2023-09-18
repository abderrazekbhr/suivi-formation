package com.backend.demo.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.concurrent.TimeUnit;

import com.backend.demo.DTO.EntiteFormatriceRetrunedToManager;
import com.backend.demo.Model.Formation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.backend.demo.Model.EntiteFormatrice;
import com.backend.demo.Repository.EntiteFormatriceRepo;

@Service
public class EntiteFormatriceService {
    private final EntiteFormatriceRepo entiteFormatriceRepo;
    @Autowired
    public EntiteFormatriceService(EntiteFormatriceRepo entiteFormatriceRepo){
        this.entiteFormatriceRepo=entiteFormatriceRepo;
    }

    public void addEntiteFormatrice(EntiteFormatrice entiteFormatrice) {
        entiteFormatriceRepo.save(entiteFormatrice);
    }

    public List<EntiteFormatriceRetrunedToManager> getAllEntite() {

        return entiteFormatriceRepo.findAll().stream().map((EntiteFormatrice ef)->
            new  EntiteFormatriceRetrunedToManager(
                    ef.getIdEntite(), ef.getNomEntite(), ef.getDescription(),ef.getFormations().size()
            )
        ).toList();
    }

    public EntiteFormatrice getEntiteById(Integer id) {
        if(entiteFormatriceRepo.findById(id).isPresent()){
            EntiteFormatrice e= entiteFormatriceRepo.findById(id).get();
            return e;
        }
        return null;
    }

    public EntiteFormatriceRetrunedToManager getEntiteByIdToManager(Integer id) {
        if(entiteFormatriceRepo.findById(id).isPresent()){
            EntiteFormatrice e= entiteFormatriceRepo.findById(id).get();
            return new EntiteFormatriceRetrunedToManager(e.getIdEntite(),e.getNomEntite(),e.getDescription(),e.getFormations().size());
        }
        return null;
    }

    public void deleteEntiteFormatrice(Integer id) {
        if(entiteFormatriceRepo.findById(id).isPresent()){
            EntiteFormatrice ef= entiteFormatriceRepo.findById(id).get();
            System.out.println("delete:"+id);
            entiteFormatriceRepo.deleteById(id);

        }
    }

    public List<EntiteFormatrice> filterEntiteByNom(String nom) {
        return entiteFormatriceRepo.findAll().stream().filter(entiteFormatrice -> entiteFormatrice.getNomEntite().contains(nom)).toList();
    }


    public List<EntiteFormatrice> filterEntiteByDescription(String description) {
        return entiteFormatriceRepo.findAll().stream().filter(entiteFormatrice -> entiteFormatrice.getDescription().contains(description)).toList();
    }

    public void deleteFormation(EntiteFormatrice entiteFormatrice, Formation formation) {
        entiteFormatrice.deleteFormation(formation);
        entiteFormatriceRepo.save(entiteFormatrice);
    }




    public void updateEntiteFormatrice(Object idEntite, Object nomEntite, Object description) {
        if(entiteFormatriceRepo.findById((Integer) idEntite).isPresent()){
            EntiteFormatrice entiteFormatrice=entiteFormatriceRepo.findById((Integer) idEntite).get();
            entiteFormatrice.setNomEntite((String) nomEntite);
            entiteFormatrice.setDescription((String) description);
            entiteFormatriceRepo.save(entiteFormatrice);
        }
    }


}
