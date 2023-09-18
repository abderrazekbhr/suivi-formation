package com.backend.demo.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ReturnedDev {
    private String nom;
    private String prenom;
    private String numero;
    private String password;
    private List<String> categories;
}
