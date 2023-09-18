package com.backend.demo.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.demo.Model.Formation;

public interface FormationRepo extends JpaRepository<Formation,Long> {
    
}
