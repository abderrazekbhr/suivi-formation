package com.backend.demo.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Certif {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Integer idCertif;
    private String cetifName;
    private LocalDate validationDateStart;
    private LocalDate validationDateEnd;
    private String imageName;
    private Long idFormation;
    @ManyToOne(cascade = CascadeType.ALL)
    private Developpeur certifiedDev;

    public Certif(String cetifName, LocalDate validationDateStart, LocalDate validationDateEnd, Long idFormation, String originalFilename) {
    }

    @Override
    public boolean equals(Object c){
        if(c instanceof Certif certif){
            return certif.getIdCertif().equals(this.getIdCertif());
        }
        return false;
    }

}
