package dev.inside.sovcom.hac.auth.auth.controller;

import dev.inside.sovcom.hac.auth.auth.dto.JwtDto;
import dev.inside.sovcom.hac.auth.auth.dto.SignInRequestDto;
import dev.inside.sovcom.hac.auth.auth.security.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
public class JwtController {

    @Autowired
    private JwtUtils jwtUtils;

    //TODO валидация (если успеваем)
    @PostMapping("/sign-in")
    public ResponseEntity<JwtDto> signIn(@RequestBody SignInRequestDto signInRequestDto) {
        String jwt = jwtUtils.generate(signInRequestDto.getPrincipal());
        JwtDto jwtDto = new JwtDto(jwt);
        return ResponseEntity.ok(jwtDto);
    }
}
