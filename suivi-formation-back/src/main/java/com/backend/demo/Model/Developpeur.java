package com.backend.demo.Model;

import java.util.List;
import java.util.Set;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor
@Getter
@Setter
@Entity
@ToString
public class Developpeur extends User {
    @ManyToMany(cascade = CascadeType.ALL)
    @ToString.Exclude
    List<Formation> myFavoris;

    @ManyToOne
    Manager manager;

    @ElementCollection
    List<String> categories;

    @OneToMany(mappedBy = "certifiedDev",cascade = CascadeType.ALL)
    @ToString.Exclude
    private Set<Certif> certifs;


    public Developpeur(String nom, String prenom, String email, String password, String profession, String numero) {
        super(email, nom, prenom, numero, password, profession);
    }
    public void deleteFormationFavorites(Formation f){
        myFavoris.remove(f);
    }
    public void addCertif(Certif c){
        certifs.add(c);
    }

    public void deleteCertif(Certif c){
        certifs.remove(c);
    }
    public void addFormationFavorites(Formation f) {
        myFavoris.add(f);
    }

    public boolean equals(Object devloppeur) {
        if (devloppeur instanceof Developpeur) {
            Developpeur d = (Developpeur) devloppeur;
            return d.getEmail().equals(this.getEmail());
        }
        return false;
    }

}
