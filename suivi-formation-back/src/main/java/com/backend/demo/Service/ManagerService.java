package com.backend.demo.Service;
import com.backend.demo.Model.Manager;
import com.backend.demo.Repository.ManagerRepo;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.stereotype.Service;

@Service
@EnableScheduling

public class ManagerService{
    private final ManagerRepo managerRepo;
    final JavaMailSender javaMailSender;

    public ManagerService(
            ManagerRepo managerRepo
            , JavaMailSender javaMailSender
            ){
        this.javaMailSender = javaMailSender;

        this.managerRepo=managerRepo;
    }

    public void   saveManager(Manager manager){
        this.managerRepo.save(manager);
    }

    public Manager getManager(String email){
        if(this.managerRepo.findById(email).isPresent()){
            return this.managerRepo.findById(email).get();

        }
        return null;
    }

    public void deleteManager(String email){
        if(this.managerRepo.findById(email).isPresent()){
            this.managerRepo.deleteById(email);
        }
    }

    public boolean isPresentManager(String email){
        return this.managerRepo.findById(email).isPresent();
    }

    public void  deleteManagerFormation(Manager m, Long idF){
        m.deleteFormation(idF);
        this.managerRepo.save(m);
    }





    @Async
    public void sendEmail(String email,String subject,String text){
        SimpleMailMessage msg = new SimpleMailMessage();
        msg.setTo(email);
        msg.setSubject(subject);
        msg.setText(text);
        try {
            javaMailSender.send(msg);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }





}