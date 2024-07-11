from fastapi import FastAPI

from ai.optimization import optimization as ai_optimization

app = FastAPI(docs_url='/api/swagger/')


@app.post("api/advert")
def advert():
    return {"Hello": "World"}


@app.post("api/optimization")
def optimization(
        age_from: int,
        age_to: int,
        name: str,
        income: str,
        gender: str,
        iterations: int,
        number_dots: int
):
    max_value, max_dots = ai_optimization(age_from, age_to, name, income, gender, number_dots,
                                          iterations)
    max_dots = [tuple(x) for x in max_dots[['lat', 'lon']].itertuples(index=False, name=None)]
    return {'max_value': max_value, 'max_dots': max_dots}
