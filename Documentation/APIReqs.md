## Roles
<ul>
    <li>(G)uest</li>
    <li>(U)ser</li>
    <li>(M)oderator</li>
    <li>(A)dmin</li>
</ul>

## Users
<table style="text-align: center">
	<thead>
		<tr>
			<th>Method</th>
			<th>G</th>
			<th>U</th>
			<th>M</th>
			<th>A</th>
		</tr>	
	</thead>
	<tbody>
        <tr>
            <td>PostAsync</td>
            <td colspan=2>—</td>
            <td colspan=2>+</td>
        </tr>
        <tr>
            <td>GetByIdAsync</td>
            <td colspan=2>—</td>
            <td colspan=2>+</td>
        </tr>
        <tr>
            <td>GetPaginatedAsync</td>
            <td colspan=2>—</td>
            <td colspan=2>+</td>  
        </tr>
        <tr>
            <td>GetByLogin</td>
            <td colspan=2>—</td>
            <td colspan=2>+</td>
        </tr>
        <tr>
            <td>PatchAsync</td>
            <td colspan=2>—</td>
            <td colspan=2>+</td>
        </tr>
        <tr>
            <td>DeleteAsync</td>
            <td>—</td>
            <td>Self</td>
            <td>Self/U</td>
            <td>M/U</td>
        </tr>
	</tbody>
</table>

## Templates
<table style="text-align: center">
	<thead>
		<tr>
			<th>Method</th>
			<th>G</th>
			<th>U</th>
			<th>M</th>
			<th>A</th>
		</tr>	
	</thead>
	<tbody>
        <tr>
            <td>PostAsync</td>
            <td>—</td>
            <td colspan=3>+</td>
        </tr>
        <tr>
            <td>GetByIdAsync</td>
            <td colspan=2>—</td>
            <td colspan=2>+</td>
        </tr>
        <tr>
            <td>GetPaginatedAsync</td>
            <td colspan=4>+</td>
        </tr>
        <tr>
            <td>GetByNameAsync</td>
            <td colspan=4>+</td>
        </tr>
        <tr>
            <td>PatchAsync</td>
            <td>—</td>
            <td>Own</td>
            <td colspan=2>+</td>
        </tr>
        <tr>
            <td>DeleteAsync</td>
            <td>—</td>
            <td>Own</td>
            <td colspan=2>+</td>
        </tr>
	</tbody>
</table>

## Reports
<table style="text-align: center">
	<thead>
		<tr>
			<th>Method</th>
			<th>G</th>
			<th>U</th>
			<th>M</th>
			<th>A</th>
		</tr>	
	</thead>
	<tbody>
        <tr>
            <td>PostAsync</td>
            <td>—</td>
            <td colspan=3>+</td>
        </tr>
        <tr>
            <td>GetByIdAsync</td>
            <td colspan=2>—</td>
            <td colspan=2>+</td>
        </tr>
        <tr>
            <td>GetPaginatedAsync</td>
            <td colspan=4>+</td>
        </tr>
        <tr>
            <td>GetByNameAsync</td>
            <td colspan=4>+</td>
        </tr>
        <tr>
            <td>PatchAsync</td>
            <td>—</td>
            <td>Own</td>
            <td colspan=2>+</td>
        </tr>
        <tr>
            <td>DeleteAsync</td>
            <td>—</td>
            <td>Own</td>
            <td colspan=2>+</td>
        </tr>
	</tbody>
</table>

## Authentication
<table style="text-align: center">
	<thead>
		<tr>
			<th>Method</th>
			<th>G</th>
			<th>U</th>
			<th>M</th>
			<th>A</th>
		</tr>	
	</thead>
	<tbody>
        <tr>
            <td>LoginAsync</td>
            <td>+</td>
            <td colspan=3>—</td>
        </tr>
        <tr>
            <td>RegisterAsync</td>
            <td>+</td>
            <td colspan=3>—</td>
        </tr>
	</tbody>
</table>
