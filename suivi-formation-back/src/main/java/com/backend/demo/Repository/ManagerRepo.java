package com.backend.demo.Repository;

import com.backend.demo.Model.Manager;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ManagerRepo extends JpaRepository<Manager,String> {}
