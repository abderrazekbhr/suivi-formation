package com.backend.demo.Model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class User {
    @Id
    private String email;
    private String nom;
    private String prenom;
    private String numero;
    private String password;
    private String profession;

    public User(String email, String nom, String prenom, String numero, String password, String profession) {
        this.email = email;
        this.nom = nom;
        this.prenom = prenom;
        this.numero = numero;
        this.password = password;
        this.profession = profession;
    }

    @Override
    public boolean equals(Object obj) {
        if (obj instanceof User) {
            User user = (User) obj;
            if (user.getEmail().equals(email))
                return true;
        }
        return false;
    }
}
