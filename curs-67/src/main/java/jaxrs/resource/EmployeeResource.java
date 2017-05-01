package jaxrs.resource;

import ejb.EmployeeFacade;
import jpa.Employee;

import javax.ejb.EJB;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;

/**
 * Created by scipianus on 28-Apr-17.
 */
@Path("/")
public class EmployeeResource {

    @EJB
    private EmployeeFacade employeeFacade;

    @GET
    @Produces({MediaType.APPLICATION_JSON})
    @Path("getAll")
    public Response getAll() {
        List<Employee> employees = employeeFacade.getEmployees();
        return Response.ok(employees).build();
    }

    @POST
    @Consumes({MediaType.APPLICATION_JSON})
    @Produces({MediaType.APPLICATION_JSON})
    @Path("add")
    public Response add(Employee employee) {
        employeeFacade.addEmployee(employee);
        return Response.ok().build();
    }

    @DELETE
    @Produces({MediaType.APPLICATION_JSON})
    @Path("delete/{id}")
    public Response delete(@PathParam("id") int id) {
        Employee employee = Employee.builder().id(id).build();
        employeeFacade.delete(employee);
        return Response.ok().build();
    }
}
