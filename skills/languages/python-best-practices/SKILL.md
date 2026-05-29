---
name: python-best-practices
description: Use when writing production Python — typing, async/await, dependency management, testing with pytest, packaging, and performance optimization
tags: [languages, python, backend]
version: 1.0.0
---

# Python Best Practices

## Domain Expertise

### Core Principles
- **Type hints everywhere** — Add types to all function signatures; use `mypy --strict` in CI
- **Composition over inheritance** — Prefer protocols, mixins, and dependency injection over deep class hierarchies
- **Explicit over implicit** — No wildcard imports, no `**kwargs` passthrough without typing, no bare `except:`
- **Small functions** — Each function does one thing; < 20 lines; pure where possible

### Key Patterns

1. **Typed Interfaces with Protocols** — Define behavior with `Protocol` instead of abstract base classes. Structural subtyping is more flexible than inheritance.

```python
from typing import Protocol

class Serializable(Protocol):
    def to_dict(self) -> dict[str, object]: ...
```

2. **Async Patterns** — Use `anyio` or `asyncio` with structured concurrency via `TaskGroup`. Avoid `asyncio.gather()` without error handling.

```python
async with asyncio.TaskGroup() as tg:
    task1 = tg.create_task(fetch("https://api.example.com/1"))
    task2 = tg.create_task(fetch("https://api.example.com/2"))
```

3. **Pydantic for Data** — Use Pydantic v2 for all data models at system boundaries (API requests/responses, config, DB models). Validation, serialization, and docs generation built in.

```python
from pydantic import BaseModel, Field

class CreateUserRequest(BaseModel):
    email: str = Field(pattern=r"^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$")
    name: str = Field(min_length=1, max_length=100)
```

4. **Dependency Injection** — Use `fastapi.Depends` or manual constructor injection. Avoid global singletons.

```python
class UserService:
    def __init__(self, repo: UserRepository, cache: CacheClient): ...
```

5. **Pytest Fixtures** — Use `conftest.py` for shared fixtures. Scope appropriately (session, module, function). Use `tmp_path` for temp files.

```python
@pytest.fixture
def db_session():
    engine = create_engine("sqlite:///:memory:")
    Base.metadata.create_all(engine)
    session = Session(engine)
    yield session
    session.close()
```

## Checklist

- [ ] All function signatures have type hints
- [ ] `mypy --strict` passes without errors
- [ ] No wildcard imports (`from module import *`)
- [ ] Async functions use `TaskGroup` for structured concurrency
- [ ] Data models at boundaries use Pydantic
- [ ] Tests use pytest with fixtures (not unittest.TestCase)
- [ ] `pyproject.toml` configures tooling (mypy, pytest, ruff)
- [ ] Dependencies pinned with `pip freeze` or poetry/uv lockfile

## Common Pitfalls

- **Mutable default arguments** — `def foo(items=[])` is evaluated once at definition time. Use `None` + `if items is None: items = []`.
- **Bare `except:`** — Catches `KeyboardInterrupt` and `SystemExit`. Always use `except Exception:`.
- **Ignoring `__init__.py`** — Missing `__init__.py` in tests causes confusing import errors.
- **Overusing `*args, **kwargs`** — Loss of type safety and autocomplete. Define explicit parameters.
