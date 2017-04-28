package jpa;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Tolerate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

/**
 * Created by scipianus on 20-Apr-17.
 */
@Getter
@Setter
@Builder
@Entity
public class Employee {

    @Id
    private int id;
    @Column
    private String name;
    @Column
    private double salary;

    @Tolerate
    public Employee() {
    }
}
