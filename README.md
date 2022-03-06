# ZicoBadges
 Badges for web3 users

 Part of EthDenver 2022 🙌

# Setup

## Env File

Create a .env file in the root of the repo for environment variables. This is .gitignored,
so it will not be applied to the repo by default.

It should contain the following variables to allow our Smart Contracts to reference PolkaDot:

```
ALCHEMY_MUMBAI_URL=foo
MUMBAI_PRIVATE_KEY=bar
```

## Python Dependencies

To manage Python dependencies, we recommend creating a virtual environment name ".venv"
in the root of the repository and installing all requirements there.

All of the requirements are detailed in `python/requirements.txt`. To install all

To create the venv, activate, and install the project requirements you run the following commands on Unix:
```
python3 -m venv .venv
source .venv/bin/activate
pip3 install -r requirements.txt
```

And these on Windows:
```
python3 -m venv .venv
.venv\Scripts\activate.bat
pip3 install -r requirements.txt
```

Note: the name .venv is in the .gitignore file, so a virtual env of that name only will be ignored.
If you wish to use a different name, make sure not to commit it to the repository.

See [here](https://docs.python.org/3/tutorial/venv.html) for more details.

## AWS CDK

We use the Amazon Web Services Cloud Development Kit to manage our cloud resources. All resources are defined
as Python classes, and running a "deployment" causes the cloud versions of those resources to be updated
to match the current definitions in this repository.

To deploy with the CDK, you need to have an IAM (Identity and Access Management) user with the proper permissions.
TODO: Figure out what these are.

Ask an admin to create an IAM users with API keys. Then, configure your
[credentials and config files](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-files.html) with the keys
under profile name {profile_name}.

To deploy, run these commands:
```
export AWS_PROFILE={profile_name}
cdk deploy Badges --outputs-file cdk_deployment_outputs.json
```

It will ask you for your permission to deploy resources that modify IAM permissions.
Press Y and the deployment will proceed.

If the deployment fails, log into the Coudformation console using your IAM user to debug.

## Database

For a database, we chose AWS's cloud-native NoSQL database, [DynamoDB](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Introduction.html),

NoSQL means that this database does not follow the rigid standards of SQL relational databases.
Because our data is not complex and our access patterns are simple, we can take advantage of this
added flexibility to more easily and quickly develop a production ready system.

For instance,

* No need to worry about database schema migrations.
* We can store all badges in the same table with arbitrary schemas without
altering the schema each time.
* No deployment worries, since Amazon manages everything. Even compared to
AWS RDS, the SQL service, the deployment is much easier.

We use an Object Relationship Manager (ORM) called [PynamoDB](https://pynamodb.readthedocs.io/en/latest/indexes.html)
for working with Dynamo rows in Python. This renders each row as a Python object and lets us work with
them intuitively instead of making raw database commands.


# Code Style

## Python

### Documentation

All functions and methods should have docstrings written according to the conventions
outlined in [PEP 257](https://www.python.org/dev/peps/pep-0257/). File and module level
docstrings are optional but nice.

### Static Type Checking

Python is a dynamic language, which adds flexibility but also makes code much more prone to type related bugs.
We use the [MyPy static type checker](https://mypy.readthedocs.io/en/stable/) to ensure that all objects
types are combatible.

Code should be annotated using the type hints introduced in [PEP 484](https://www.python.org/dev/peps/pep-0484/).
To type check your code, run the following commands:

```
mypy -p python
```

The settings for MyPy are definined in the mypy.ini file in the root of the repo.

We use mypy -p because Python is a package within our repo, and imports
will be evaluated wrongly if we use defauly MyPy. See Python BDFL Guido van Rossum's
answer [here](https://lifesaver.codes/answer/release-0-780-source-file-found-twice-under-different-module-names-error-8944).


### Linting

We use the libraries [Black](https://black.readthedocs.io/en/stable/) and [Flake8](https://flake8.pycqa.org/en/latest/)
to enforce code style.

Black is a "code formatter" that will modify the code to standardize attributes such as string styling, line breaks,
argument formatting, and parentheses. Named for Henry Ford's quip about the Model T coming in any color you like (as
long as it's black), Black enforces a [single style](https://black.readthedocs.io/en/stable/the_black_code_style/current_style.html#code-style)
aiming for "consistency, generality, readability, and reducing git diffs."

Flake8 is a style guide enforcement tool that logs code in violation of certain style rules. Unlike Black it only logs
issues with code instead of modifying to resolve, but as such it can cover a wider range of violations.

To lint your code, run the following commands:

```
black .
flake8 .
```

This will first reformat the repo to be in accordance with Black's style, and then print to console all lines
that violate Flake8's style guide.

The settings for Flake8 are definined in the .flake8 file in the root of the repo.
See [here](https://black.readthedocs.io/en/stable/guides/using_black_with_other_tools.html#flake8) for details on how the default settins have to be
altered for compatibility with Black.

### Testing

Use [Pytest](https://docs.pytest.org/en/7.0.x/) for testing. Structure test cases to use [fixtures](https://docs.pytest.org/en/7.0.x/explanation/fixtures.html)
to handle setup and teardown wherever possible.

There are two suites of tests: unit and integration.

To run tests, run the following command where suite is either "unit" or "integration":

```
pytest tests/{suite}
```

## Javascript

Use Typescript if possible (files end with .ts)

Good references:

* [Google Style Guide](https://google.github.io/styleguide/tsguide.html)
