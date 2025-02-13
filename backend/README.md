## Initial fastAPI

1. Instiall uv: `powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"`
2. Set Environment Path for uv
3. Create a Virtual Environment: `uv venv`
4. Activate the Virtual Environment: `.venv\Scripts\Activate.ps1`
5. Check the Virtual Environment is Active: `Get-Command python`
6. Install Packages: `pip install -r requirements.txt`

[详情参考: https://fastapi.tiangolo.com/#installation/](https://fastapi.tiangolo.com/#installation/)

Exit Virtual Environment: `deactivate`

Run Backend: `fastapi dev main.py`
