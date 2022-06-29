package de.borisskert.springstaticwebcontentexample;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.reactive.server.WebTestClient;

import static org.hamcrest.Matchers.endsWith;
import static org.hamcrest.Matchers.startsWith;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class ApplicationIT {

    @Autowired
    private WebTestClient client;

    @Test
    void shouldRequestAngularPage() throws Exception {
        client.get()
                .uri("/")
                .exchange()
                .expectStatus()
                .is2xxSuccessful()
                .expectBody(String.class)
                .value(startsWith("<!DOCTYPE html>"))
                .value(endsWith("</body></html>"))
        ;
    }
}
