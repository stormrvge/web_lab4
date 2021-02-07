package com.controllers.dot;


import com.controllers.SessionService;
import com.controllers.Validator;
import com.model.Result;
import com.repository.ResultRepository;
import com.utils.HitChecker;
import com.utils.json.JsonArray;
import com.utils.json.JsonResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.annotation.SessionScope;

import javax.servlet.http.HttpSession;
import java.time.LocalTime;
import java.util.List;

@CrossOrigin(origins = "http://localhost:4200", allowCredentials = "true")
@RestController
@SessionScope
public class DotController
{
    private final ResultRepository result_repository;

    public DotController(ResultRepository result_repository)
    {
        this.result_repository = result_repository;
    }

    @GetMapping("/rest/getDots")
    public ResponseEntity<String> getDots(HttpSession session) {
        if (!SessionService.global.has(session.getId())) {
            return new ResponseEntity<>(JsonResponse.error("you are not logged in"), HttpStatus.UNAUTHORIZED);
        }

        String username = SessionService.global.getUsername(session.getId());
        List<Result> dotsList = result_repository.getAllByUserId(username);
        JsonArray points_array = JsonArray.from(dotsList);

        return new ResponseEntity<>(JsonResponse.data(points_array), HttpStatus.OK);
    }

    @GetMapping("/rest/getDotsShort")
    public ResponseEntity<String> getDotsShort(HttpSession session) {
        if (!SessionService.global.has(session.getId())) {
            return new ResponseEntity<>(JsonResponse.error("you are not logged in"), HttpStatus.UNAUTHORIZED);
        }

        String username = SessionService.global.getUsername(session.getId());

        JsonArray points_array = new JsonArray();
        try {
            List<Result> resultList = result_repository.getAllByUserId(username);
            if (resultList.size() > 3) {
                resultList = resultList.subList(resultList.size() - 3, resultList.size());
            }

            points_array = JsonArray.from(resultList);
        } catch (IndexOutOfBoundsException e) {
            points_array.append("Table clear");
        }

        return new ResponseEntity<>(JsonResponse.data(points_array), HttpStatus.OK);
    }

    @DeleteMapping("/rest/clear")
    public ResponseEntity<String> clear(HttpSession session)
    {
        if (!SessionService.global.has(session.getId())) {
            return new ResponseEntity<>(JsonResponse.error("you are not logged in"), HttpStatus.UNAUTHORIZED);
        }

        List<Result> results = this.result_repository.getAllByUserId(SessionService.global.getUsername(session.getId()));
        this.result_repository.deleteAll(results);
        return new ResponseEntity<>(JsonResponse.data(null), HttpStatus.OK);
    }

    @GetMapping("/rest/getDotsByRadius")
    public ResponseEntity<String> dotsByRadius(HttpSession session, @RequestParam("r") double r)
    {
        if (!SessionService.global.has(session.getId())) {
            return new ResponseEntity<>(JsonResponse.error("you are not logged in"), HttpStatus.UNAUTHORIZED);
        }

        String username = SessionService.global.getUsername(session.getId());
        List<Result> dotsList = result_repository.getAllByUserIdAndR(username, r);
        JsonArray points_array = JsonArray.from(dotsList);

        return new ResponseEntity<>(JsonResponse.data(points_array), HttpStatus.OK);
    }

    @GetMapping("/rest/dot")
    public ResponseEntity<String> dot(HttpSession session, @RequestParam("x") String x, @RequestParam("y") String y, @RequestParam("r") String r)
    {
        long start = System.currentTimeMillis();


        if (!SessionService.global.has(session.getId())) {
            return new ResponseEntity<>(JsonResponse.error("you are not logged in"), HttpStatus.UNAUTHORIZED);
        } else {
            try
            {
                Validator.validateX(x);
                Validator.validateY(y);
                Validator.validateR(r);
            }
            catch (RuntimeException e)
            {
                return new ResponseEntity<>(JsonResponse.error(e.getMessage()), HttpStatus.OK);
            }
        }

        LocalTime date = LocalTime.now();

        Result result = new Result(Double.parseDouble(x.replace(',', '.')),
                Double.parseDouble(y.replace(',', '.')),
                Double.parseDouble(r.replace(',', '.')),
                HitChecker.isInArea(Double.parseDouble(x.replace(',', '.')),
                        Double.parseDouble(y.replace(',', '.')),
                        Double.parseDouble(r.replace(',', '.'))),
                date,
                0,
                SessionService.global.getUsername(session.getId())
        );

        result.setExectime(System.currentTimeMillis() - start);
        result_repository.save(result);
        return new ResponseEntity<>(JsonResponse.data(result), HttpStatus.OK);
    }

    @GetMapping("/rest/image")
    public ResponseEntity<String> image(HttpSession session, @RequestParam("x") String x, @RequestParam("y") String y, @RequestParam("r") String r)
    {
        long start = System.currentTimeMillis();

        if (!SessionService.global.has(session.getId())) {
            return new ResponseEntity<>(JsonResponse.error("you are not logged in"), HttpStatus.UNAUTHORIZED);
        } else {
            try
            {
                double x_value = Double.parseDouble(x.replace(',', '.'));
                double y_value = Double.parseDouble(y.replace(',', '.'));
                double r_value = Double.parseDouble(r.replace(',', '.'));


                LocalTime date = LocalTime.now();

                Result result = new Result(x_value,
                        y_value,
                        r_value,
                        HitChecker.isInArea(x_value, y_value, r_value),
                        date,
                        0,
                        SessionService.global.getUsername(session.getId())
                );

                result.setExectime(System.currentTimeMillis() - start);
                result_repository.save(result);
                return new ResponseEntity<>(JsonResponse.data(result), HttpStatus.OK);
            }
            catch (NumberFormatException e)
            {
                return new ResponseEntity<>(JsonResponse.error("bad request"), HttpStatus.OK);
            }
        }
    }
}
