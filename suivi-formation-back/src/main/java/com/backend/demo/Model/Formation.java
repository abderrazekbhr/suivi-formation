package com.backend.demo.Model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "formation")
public class Formation {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long idFormation;
    private String nomFormation;
    private Integer nombrePlace;
    private Integer duree;
    private LocalDate dateDebut;
    private String categorie;
    private String image;
    private String time;
    private Short numberSendedEmail=0;
    @Column(length = 1500)
    private String description;


    @ManyToOne
    @JsonBackReference
    private EntiteFormatrice entiteFormatrice;

    @ManyToOne
    @JsonManagedReference
    private Manager manager;

    @ManyToMany(cascade = CascadeType.ALL)
    @JsonManagedReference
    private Set<Developpeur> preInscriptions;

    @ManyToMany(cascade = CascadeType.ALL)
    @JsonIgnore
    private Set<Developpeur> inscriptions;

    @Override
    public boolean equals(Object formation) {
        if (formation instanceof Formation) {
            Formation f = (Formation) formation;
            return f.getIdFormation().equals(this.getIdFormation());
        }
        return false;
    }

    public void addDeveloppeurPreInscrit(Developpeur d) {
        if(preInscriptions!=null)
        {

            preInscriptions.add(d);
        }
        else{
            preInscriptions=Set.of(d);
        }
    }

    public void deleteDeveloppeurPreInscrit(Developpeur d) {
        preInscriptions.remove(d);
    }

    public void addInscription(Developpeur d) {
        inscriptions.add(d);
    }

    public void removeInscription(Developpeur d) {
        inscriptions.remove(d);
    }


    @Override
    public String toString() {
        return getClass().getSimpleName() + "(" +
                "idFormation = " + idFormation + ", " +
                "nomFormation = " + nomFormation + ", " +
                "nombrePlace = " + nombrePlace + ", " +
                "duree = " + duree + ", " +
                "time = " + time + ", " +
                "numberSendedEmail = " + numberSendedEmail + ", " +
                "entiteFormatrice = " + entiteFormatrice + ", " +
                ")";
    }
}
