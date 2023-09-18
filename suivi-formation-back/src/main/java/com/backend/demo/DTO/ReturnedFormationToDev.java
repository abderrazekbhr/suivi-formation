package com.backend.demo.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ReturnedFormationToDev {
    private Long idFormation;
    private String nomFormation;
    private Integer nombrePlace;
    private Integer duree;
    private LocalDate dateDebut;
    private String categorie;
    private String description;
    private String entiteFormatrice;
    private Boolean liked;
    private String time;
    private Boolean inscription;

}
