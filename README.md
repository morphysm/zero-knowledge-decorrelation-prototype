# ZicoBadges
 Badges for web3 users

 Part of EthDenver 2022 🙌

# Setup

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
mypy .
```

The settings for MyPy are definined in the mypy.ini file in the root of the repo.


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
