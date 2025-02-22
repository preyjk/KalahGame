## Run FastAPI

### Run FastAPI without Docker

[详情参考: https://fastapi.tiangolo.com/#installation/](https://fastapi.tiangolo.com/#installation/)

1. Instiall uv: `powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"`
2. Set Environment Path For `uv`
3. Create a Virtual Environment: `uv venv`
4. Activate the Virtual Environment: `.venv\Scripts\Activate.ps1` (Exit activiate: `deactivate`)
5. Check the Virtual Environment is Active In Venu: `Get-Command python`
6. Configure `requirements.txt` with at least `fastapi[standard]`
7. Install Packages: `uv pip install -r requirements.txt`
8. Run FastAPI: `fastapi dev main.py`

### Run FastAPI with Docker

1. Create and Config `dockerfile` (no need to create virtual environment because docker is a virtual environment)
2. Create and Config `docker-compose.yml`
3. Run Docker Compose
