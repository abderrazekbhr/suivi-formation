package com.backend.demo.Controller;

import com.backend.demo.DTO.EntiteFormatriceRetrunedToManager;
import org.springframework.web.bind.annotation.*;

import com.backend.demo.Model.EntiteFormatrice;
import com.backend.demo.Service.EntiteFormatriceService;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

@RestController
@CrossOrigin("http://localhost:4200")
@RequestMapping(value = "/entite-formatrice", method = { RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE,
        RequestMethod.PUT })
public class EntiteFormatriceController {

    private final EntiteFormatriceService enititeFormatriceService;
    @Autowired
    public  EntiteFormatriceController(
            EntiteFormatriceService enititeFormatriceService
    ){
    this.enititeFormatriceService=enititeFormatriceService;
    }
    @PostMapping("/add")
    public void addEntiteFormatrice(@RequestBody HashMap<String,String> entiteFormatrice) {

        EntiteFormatrice entite=new EntiteFormatrice(entiteFormatrice.get("nomEntite"),entiteFormatrice.get("description"));
        enititeFormatriceService.addEntiteFormatrice(entite);
    }

    @GetMapping("/filter-by-nom")
    public List<EntiteFormatrice> filterByNom(@RequestParam("filter") String nom) {
        return enititeFormatriceService.filterEntiteByNom(nom);
    }

    @GetMapping("/filter-by-description")
    public List<EntiteFormatrice> filterByDescription(@RequestParam("filter")  String description) {
        return enititeFormatriceService.filterEntiteByDescription(description);
    }

    @GetMapping("/get-all")
    public List<EntiteFormatriceRetrunedToManager> getAllEntiteFormatrice() {
        return enititeFormatriceService.getAllEntite();
    }

    @DeleteMapping("/delete")
    public void deleteEntiteFormatrice(@RequestParam Integer id) {
        enititeFormatriceService.deleteEntiteFormatrice(id);
    }

    @PutMapping("/update")
    public void updateEntiteFormatrice(@RequestBody HashMap<String,Object> ef) {
        enititeFormatriceService.updateEntiteFormatrice(ef.get("idEntite"),ef.get("nomEntite"),ef.get("description"));
    }

    @GetMapping("/get-by-id")
    public EntiteFormatriceRetrunedToManager getEntiteByIdToManager(@RequestParam("id") Integer id){
        return enititeFormatriceService.getEntiteByIdToManager(id);
    }

}
