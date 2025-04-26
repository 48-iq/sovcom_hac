package dev.inside.sovcom.hac.main.auth.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;


@Component
public class JwtUtils{
    @Value("${app.jwt.secret}")
    private String secret;

    @Value("${app.jwt.issuer}")
    private String issuer;

    @Value("${app.jwt.subject}")
    private String subject;

    public String validateAndRetrievePrincipal(String jwt) throws JWTVerificationException {
        DecodedJWT decodedJWT = JWT.require(Algorithm.HMAC256(secret))
                .withClaimPresence("principal")
                .withIssuer(issuer)
                .withSubject(subject)
                .build().verify(jwt);
        return decodedJWT.getClaim("principal").asString();
    }
}
