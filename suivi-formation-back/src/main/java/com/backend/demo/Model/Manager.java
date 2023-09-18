package com.backend.demo.Model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class Manager extends User {
    @JsonManagedReference
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "manager")
    List<Formation> myFomrations;

    @OneToMany(cascade = CascadeType.ALL)
    List<Developpeur> developpeurs;


    public Manager(String nom, String prenom, String email, String password, String profession, String numero) {
        super(email, nom, prenom, numero, password, profession);
    }

    public void addDeveloppeur(Developpeur developpeur) {
        developpeurs.add(developpeur);
    }

    public void deleteMember(Developpeur developpeur) {
        developpeurs.remove(developpeur);
    }

    public void addFormation(Formation formation) {
        myFomrations.add(formation);
    }

    public void deleteFormation(Long idFormation) {
        myFomrations.removeIf(formation -> formation.getIdFormation().equals(idFormation));
    }

    @Override
    public String toString() {
        return getClass().getSimpleName() + "(" +
                "email = " + getEmail() + ")";
    }
}
