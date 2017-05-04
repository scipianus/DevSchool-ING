package ro.isr.devschool.mvc;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import ro.isr.devschool.jpa.EmployeeRepository;

/**
 * Created by scipianus on 04-May-17.
 */
@Controller
public class HomeController {

    @Autowired
    private EmployeeRepository employeeRepository;

    @RequestMapping("/")
    public String home(Model model) {
        model.addAttribute("employees", employeeRepository.findAll());
        return "index";
    }
}
