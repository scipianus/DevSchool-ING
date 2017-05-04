package ro.isr.devschool.jpa;

import org.springframework.data.repository.CrudRepository;

/**
 * Created by scipianus on 04-May-17.
 */
public interface EmployeeRepository extends CrudRepository<Employee, Integer> {
}
