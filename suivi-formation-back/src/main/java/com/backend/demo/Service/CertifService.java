package com.backend.demo.Service;

import com.backend.demo.Model.Certif;
import com.backend.demo.Model.Developpeur;
import com.backend.demo.Repository.CertifRepo;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.time.LocalDate;
import java.util.Set;

@Service
public class CertifService {
    private final DeveloppeurService developpeurService;
    private final CertifRepo certifRepo;
    public CertifService(DeveloppeurService developpeurService,CertifRepo certifRepo){
        this.developpeurService = developpeurService;
        this.certifRepo=certifRepo;
    }

    public Certif getCertif(Integer id){
        if(certifRepo.findById(id).isPresent()){
            return certifRepo.findById(id).get();
        }
        return null;
    }

    public Set<Certif> getCertifyByDev(String emailDev){
        return  developpeurService.getDeveloppeur(emailDev).getCertifs();
    }

    public void removeCertif(Integer id,String emailDev){
        Developpeur d = developpeurService.getDeveloppeur(emailDev);
        Certif c = getCertif(id);
        d.deleteCertif(c);
        developpeurService.saveDeveloppeur(d);
        certifRepo.delete(c);

    }

    public void addCertif(String cetifName, String validationDateStart, String validationDateEnd, String idFormation, MultipartFile photo, String emailDev) {
        Developpeur d = developpeurService.getDeveloppeur(emailDev);
        String rootPath = System.getProperty("user.dir");
        String relativePath = "/src/main/resources/static/"+emailDev+"/";

        Certif certif= new Certif(
                cetifName,
                LocalDate.parse(validationDateStart) ,
                LocalDate.parse(validationDateEnd),
                Long.parseLong(idFormation),
                photo.getOriginalFilename()
        );
        certif.setCertifiedDev(d);
        d.addCertif(certif);
        developpeurService.saveDeveloppeur(d);
        try {
            photo.transferTo(new File(rootPath+relativePath+ photo.getOriginalFilename()));
        } catch (Exception e) {
            System.out.println("error:" + e.getMessage());
        }
        certifRepo.save(certif);
    }
}
