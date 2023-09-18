package com.backend.demo.Repository;

import com.backend.demo.Model.Certif;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CertifRepo  extends JpaRepository<Certif, Integer> {
}
