package ro.isr.devschool.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import ro.isr.devschool.jpa.Employee;
import ro.isr.devschool.jpa.EmployeeRepository;

import java.util.Collection;

/**
 * Created by scipianus on 04-May-17.
 */
@RestController
@RequestMapping("/employees")
public class EmployeeRestController {

    @Autowired
    private EmployeeRepository employeeRepository;

    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<Collection<Employee>> getAll() {
        return new ResponseEntity<>((Collection<Employee>) employeeRepository.findAll(), HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.GET, value = "/{id}")
    public ResponseEntity<Employee> getById(@PathVariable Integer id) {
        return new ResponseEntity<>(employeeRepository.findOne(id), HttpStatus.OK);
    }
}
