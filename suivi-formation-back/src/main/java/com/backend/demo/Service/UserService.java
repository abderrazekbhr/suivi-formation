package com.backend.demo.Service;

import com.backend.demo.Model.Developpeur;
import com.backend.demo.Model.Manager;
import com.backend.demo.Model.User;
import com.backend.demo.Repository.DeveloppeurRepo;
import com.backend.demo.Repository.ManagerRepo;

import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    final DeveloppeurRepo developpeurRepo;
    final ManagerRepo managerRepo;
    public UserService(DeveloppeurRepo developpeurRepo, ManagerRepo managerRepo, JavaMailSender javaMailSender, JavaMailSender javaMailSender1) {
        this.developpeurRepo = developpeurRepo;
        this.managerRepo = managerRepo;

    }

    public record FiltredDev(String email, String nom, String prenom, String numero) {
    };

    public boolean userExist(String email) {
        return developpeurRepo.findById(email).isPresent() || managerRepo.findById(email).isPresent();
    }

    public boolean addUser(User user,List<String> categories) {
        if (userExist(user.getEmail())) {
            return false;

        }
        if (user.getProfession().equals("Developpeur")) {
            Developpeur dev = new Developpeur(user.getNom(), user.getPrenom(), user.getEmail(), user.getPassword(),
                    user.getProfession(), user.getNumero());
            dev.setCategories(categories);
            developpeurRepo.save(dev);
            createOwnerFolder(user.getEmail());

        } else {
            Manager manager = new Manager(user.getNom(), user.getPrenom(), user.getEmail(), user.getPassword(),
                    user.getProfession(), user.getNumero());
            managerRepo.save(manager);
        }
        return true;
    }

    private void createOwnerFolder(String email){
        String rootPath = System.getProperty("user.dir");
        String relativePath = "/src/main/resources/static/"+email+"/";
        File folder = new File(rootPath+relativePath);
        if (!folder.exists()) {
            if (folder.mkdir()) {
                System.out.println("Folder created successfully.");
            } else {
                System.out.println("Failed to create folder.");
            }
        } else {
            System.out.println("Folder already exists.");
        }
    }

    public HashMap<String, Object> login(String email, String password) {
        HashMap<String, Object> data = new HashMap<String, Object>();
        if (userExist(email)) {
            if (developpeurRepo.findById(email).isPresent()) {
                Developpeur devloppeur = developpeurRepo.findById(email).get();
                if (devloppeur.getPassword().equals(password)) {
                    data.put("role", "devloppeur");
                    data.put("state", true);

                    if (devloppeur.getManager() != null) {
                        data.put("equipe", true);
                        data.put("provider", devloppeur.getManager().getEmail());
                    }
                    return data;
                }
            } else {

                Manager manager = managerRepo.findById(email).get();
                if (manager.getPassword().equals(password)) {
                    data.put("role", "manager");
                    data.put("state", true);
                    return data;
                }
            }
        }
        return data;
    }

    public List<User> getUsers() {
        List<User> users = new ArrayList<User>();
        users.addAll(developpeurRepo.findAll());
        users.addAll(managerRepo.findAll());
        return users;
    }



    public List<FiltredDev> filterByEmail(String emailManager, String emailDev) {
        final List<String> emails;
        Manager manager = null;
        List<FiltredDev> emailsDev = new ArrayList<FiltredDev>();
        if (managerRepo.findById(emailManager).isPresent()) {
            manager = managerRepo.findById(emailManager).get();
        }
        if (manager != null) {
            emails = manager.getDeveloppeurs().stream()
                    .map(dev -> dev.getEmail()).toList();
            return developpeurRepo.findAll().stream()
                    .map(dev -> new FiltredDev(dev.getEmail(), dev.getNom(), dev.getPrenom(), dev.getNumero()))
                    .filter(dev -> dev.email().contains(emailDev) && !emails.contains(dev.email())).toList();
        }
        return emailsDev;

    }

    public boolean addDevToManager(String emailManager, ArrayList<String> emailsDev) {
        Manager manager = null;

        if (managerRepo.findById(emailManager).isPresent()) {
            manager = managerRepo.findById(emailManager).get();
        }
        if (manager != null) {
            for (String emailDev : emailsDev) {
                if (developpeurRepo.findById(emailDev).isPresent()) {
                    Developpeur developpeur = developpeurRepo.findById(emailDev).get();
                    developpeur.setManager(manager);
                    developpeurRepo.save(developpeur);
                    manager.addDeveloppeur(developpeur);
                }
            }
            managerRepo.save(manager);
            return true;
        }
        return false;
    }

    public List<String> getEmailsOfDevInTheEquipe(String emailManager) {
        Manager manager = null;
        List<String> emails = new ArrayList<String>();
        if (managerRepo.findById(emailManager).isPresent()) {
            manager = managerRepo.findById(emailManager).get();
            emails = manager.getDeveloppeurs().stream()
                    .map(dev -> dev.getEmail()).toList();
        }
        return emails;
    }

    public boolean deleteMemberEquipe(String emailManager, String emailDev) {
        Manager manager = null;
        if (managerRepo.findById(emailManager).isPresent()) {
            manager = managerRepo.findById(emailManager).get();
            if (developpeurRepo.findById(emailDev).isPresent()) {
                Developpeur developpeur = developpeurRepo.findById(emailDev).get();
                manager.deleteMember(developpeur);
                developpeur.setManager(null);
                managerRepo.save(manager);
                return true;
            }
        }
        return false;
    }

}
