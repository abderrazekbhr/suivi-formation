package com.backend.demo.Repository;

import com.backend.demo.Model.Developpeur;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DeveloppeurRepo extends JpaRepository<Developpeur, String> {
}
