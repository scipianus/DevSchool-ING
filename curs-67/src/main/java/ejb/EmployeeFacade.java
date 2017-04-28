package ejb;

import jpa.Employee;

import javax.ejb.Local;
import java.util.List;

/**
 * Created by scipianus on 20-Apr-17.
 */
@Local
public interface EmployeeFacade {
    List<Employee> getEmployees();

    void addEmployee(Employee employee);
}
