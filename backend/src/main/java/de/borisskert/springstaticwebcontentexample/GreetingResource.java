package de.borisskert.springstaticwebcontentexample;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/greeting")
public class GreetingResource {

    private int counter = 0;

    @GetMapping
    public String get() {
        counter += 1;

        return "Hello World from Spring-Boot (" + counter + ")";
    }
}
