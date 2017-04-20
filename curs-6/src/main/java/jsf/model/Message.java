package jsf.model;

import lombok.Getter;
import lombok.Setter;

import javax.faces.bean.ManagedBean;
import javax.faces.bean.RequestScoped;

/**
 * Created by scipianus on 20-Apr-17.
 */
@ManagedBean(name = "message")
@RequestScoped
public class Message {
    @Getter
    @Setter
    private String message = "Hello JSF World!";
}
