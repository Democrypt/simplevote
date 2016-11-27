<h1>Vote API</h1>

<h2>Admin API</h2>

<h3>Register</h3>
<p>
    Register user
</p>
<pre><code>
url: /api/users/register
request: get

return:
{
    
}
</code></pre>

<h3>Login</h3>
<p>
    Login user
</p>
<pre><code>
url: /api/users/login
request: get

return:
{
    
}
</code></pre>

<h3>Get a vote</h3>
<p>
    Get informations of a vote
</p>
<pre><code>
url: /api/get/<i>vote_id</i>
request: get

return:
{
    "question":"<i>vote_question</i>",
    "options":"<i>vote_options</i>",
    "date":"<i>vote_date</i>"
    "status":"<i>vote_status</i>"
}
</code></pre>

<h3>Get vote list</h3>
<p>
    Get all vote list of an user
</p>
<pre><code>
url: /api/getall/
request: get
</code></pre>

return:
{
    "question":"<i>vote_question</i>",
    "options":"<i>vote_options</i>",
    "date":"<i>vote_date</i>"
    "status":"<i>vote_status</i>"
}

<h3>Create a vote</h3>
<p>
    Create a new vote
</p>
<pre><code>
url: /api/create/
request: post
parameters:
{
    "question":"<i>vote_question</i>",
    "options":"<i>vote_options</i>",
    "date":"<i>vote_date</i>"
}

return
{ "success": "true" }
</code></pre>

<h2>Participant API</h2>

<h3>Get a vote</h3>
<p>
    Get informations of a vote
</p>
<pre><code>
url: /api/get/<i>vote_id</i>
request: get
</code></pre>

<h3>Send a vote</h3>
<p>
    Send a vote option
</p>
<pre><code>
url: /api/vote/
request: post
parameters:
{
    "id":"<i>vote_id</i>",
    "option":"<i>vote_option</i>"
}

return
{ "success": "true" }
</code></pre>

