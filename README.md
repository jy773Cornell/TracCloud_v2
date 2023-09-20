---


---

<h1 id="welcome-to-trac-cloud">Welcome to Trac Cloud!</h1>
<p>Trac Cloud aims to upgrade and consolidate the existing Trac Software v2011 into an integrated cloud-based platform for seamless agribusiness data management and reporting. The objective is to improve worker safety, market access, profitability, and sustainability in the agricultural sector while adhering to EPA standards. Catering to the increasing demand for accurate chemical input records, flexible agribusiness management, and meeting legal requirements, Trac Cloud will offer a more standardized, user-friendly, and easy-to-maintain solution.</p>
<h1 id="software-requirements">Software Requirements</h1>
<ul>
<li>
<p><strong>Python</strong>: Version 3.8+</p>
</li>
<li>
<p><strong>Node.js</strong>: Version 18.13.0</p>
</li>
<li>
<p><strong>npm</strong>: Version 18.9</p>
</li>
</ul>
<h1 id="azure-services">Azure Services</h1>
<ul>
<li>
<p><strong>Azure Web App</strong>: Used to host the <em><strong>Django</strong></em> application.</p>
</li>
<li>
<p><strong>Azure PostgreSQL Database</strong>: Used for storing all the user data and platform process data.</p>
</li>
<li>
<p><strong>Azure Cache for Redis</strong>: Set up for caching reference data across the platform.</p>
</li>
<li>
<p><strong>Azure BLOB Storage</strong>: Used for storing binary large objects like images and documents stored or generated within the platform.</p>
<p><em><strong>All the Azure configurations have already been done on both the cloud and local sites!</strong></em></p>
</li>
</ul>
<h1 id="getting-started">Getting Started</h1>
<h2 id="clone-the-repository">Clone the repository</h2>
<pre><code>git clone https://github.com/jy773Cornell/TracCloud_v2.git
cd TracCloud_v2
</code></pre>
<h2 id="set-up-a-virtual-environment-and-activate-it">Set up a virtual environment and activate it</h2>
<pre><code>python3 -m venv .\venv\ 
source venv/bin/activate # Mac
.\venv\Scripts\Activate.ps1 # Windows
</code></pre>
<h2 id="install-required-packages">Install required packages</h2>
<pre><code>pip install -r requirements.txt
</code></pre>
<h2 id="environment-variables-setting">Environment variables setting</h2>
<p>All the necessary environment variables have been set up in <em><strong>/TracCloud_v2/.env</strong></em> and on the <em><strong>Azure Web App pannal</strong></em>. The environment variables mainly are Azure services connection strings.  Be careful to modify those variables and always make sure they are all matched between the .env file and Azure pannal so that the project could be successfully launched both locally and on the service.</p>
<h2 id="launch-django-project-locally">Launch Django project locally</h2>
<pre><code>python .\manage.py runserver
</code></pre>
<h1 id="cloud-deployment">Cloud Deployment</h1>
<p>The deployment on Azure Web App has been set to continuous deployment from a GitHub repository. So every time there is a new commit pushed into the repo, the deployment will be re-run automatically. Please refer to the deployment pannal on Azure Web App page for more details.</p>
<h1 id="contact">Contact</h1>
<p>For any questions, suggestions, or feedback about the Trac Cloud platform, please reach out: <a href="mailto:jy773@cornell.edu">jy773@cornell.edu</a></p>

