package com.backend.demo.Controller;

import com.backend.demo.Model.Certif;
import com.backend.demo.Service.CertifService;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.Set;

@RestController
@RequestMapping(value = "/certif",method= {RequestMethod.GET,RequestMethod.POST, RequestMethod.DELETE,RequestMethod.PUT} )
@CrossOrigin(origins = "http://localhost:4200")
public class CertifController {
    private final  CertifService certifService;
    public CertifController(CertifService certifService){
        this.certifService=certifService;
    }
    @GetMapping("/get-all")
    public Set<Certif> getAllCertif(String emailDev){
        return certifService.getCertifyByDev(emailDev);
    }

    @PostMapping(value = "/add",consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public void addCertif(@RequestPart("cetifName") String cetifName,
                          @RequestPart("validationDateStart") String validationDateStart,
                          @RequestPart("validationDateEnd") String validationDateEnd,
                          @RequestPart("idFormation") String idFormation,
                          @RequestPart("photo") MultipartFile photo,
                          @RequestPart("emailDev") String emailDev
                          ){
        certifService.addCertif(
                cetifName,
                validationDateStart,
                validationDateEnd,
                idFormation,
                photo,
                emailDev);
    }

    @DeleteMapping("/delete")
    public void deleteCertif(@RequestParam("id") Integer id,@RequestParam("emailDev") String emailDev){
        certifService.removeCertif(id,emailDev);
    }
}
