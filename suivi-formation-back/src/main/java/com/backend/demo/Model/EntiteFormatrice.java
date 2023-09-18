package com.backend.demo.Model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "entite_Formatrice")
@AllArgsConstructor
@Setter
@Getter
@NoArgsConstructor
public class EntiteFormatrice {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Integer idEntite;
    private String nomEntite;
    @Column(length = 1000)

    private String description;
    @JsonManagedReference
    @OneToMany(mappedBy = "entiteFormatrice",cascade = CascadeType.ALL)
    List<Formation> formations;

    public EntiteFormatrice(String nomEntite,String description ){
        this.nomEntite=nomEntite;
        this.description=description;
    }

    public void addFormation(Formation formation) {
        this.formations.add(formation);
    }

    public void deleteFormation(Formation f){
        this.formations.remove(f);
    }
}
