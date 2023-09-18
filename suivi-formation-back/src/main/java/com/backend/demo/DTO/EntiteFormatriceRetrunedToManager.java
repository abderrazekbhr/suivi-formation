package com.backend.demo.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class EntiteFormatriceRetrunedToManager {
    private Integer idEntite;
    private String nomEntite;
    private String description;
    private Integer formationNumber;
}
