package ejb;

import jpa.Employee;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.util.List;

/**
 * Created by scipianus on 20-Apr-17.
 */
@Stateless
public class EmployeeFacadeImpl implements EmployeeFacade {

    @PersistenceContext(unitName = "helloWorldDS")
    private EntityManager entityManager;

    @Override
    public List<Employee> getEmployees() {
        Query query = entityManager.createQuery("SELECT e FROM Employee e");
        return (List<Employee>) query.getResultList();
    }

    @Override
    public void addEmployee(Employee employee) {
        entityManager.persist(employee);
    }
}
