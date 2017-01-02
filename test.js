var tools = require("./tools.js");
var util = require("util");
var assert = require("assert");
var async = require('async');

console.log("NodeJS tests");

console.log("Test DB write");
tools.write_record_with_values(["council_reference", "address", "description", "info_url", "comment_url", "11-10-1979", "11-10-1979", "11-10-1979", "11-10-1979"]);
tools.write_record_with_values(["council_reference2", "address2", "description2", "info_url2", "comment_url2", , "11-10-1979", "11-10-1979", "11-10-1979", "11-10-1979"]);
console.log('  test record written');

setTimeout(function() {
    console.log('...wait');

    console.log("Test ROW delete");
    tools.delete_record_with_reference("council_reference2");
    console.log('  test record Deleted');

    setTimeout(function() {
      console.log('...wait2');
      console.log("Test DB delete");
      tools.delete_data_table();
      console.log('  test db Deleted');
  }, 6000);

}, 3000);

// text = tools.get_text_from_path("http://www.puzzleduck.org", "/");
// check text contains "Welcome to PuZZleDucK.org"
// console.log("Path to text: " + util.inspect(text, {showHidden: false, depth: null}) + "...");

console.log("Simple find_between tests");
t = tools.find_between("test", 't', 't');
assert(t == "es", "simple find");
assert(tools.find_between("t(es)t", '(', ')') == "es", "bracket find");
assert(tools.find_between('t"es"t', '"', '"') == "es", "d-quote find");
assert(tools.find_between("t'es't", "'", "'") == "es", "quote find");

var example_da = `<h2><a id="Advertising" name="Advertising"></a>Town Planning Advertising</h2>
<p>The City is currently seeking comment on the&nbsp;following&nbsp;proposal:</p>
<ul>
	<li><a href="#MandurahRD">Proposed Fast Food Outlets, Car Museum, Caretaker&#39;s Dwelling, Service Station and Car Wash - Lots 102 and 104 (No.2263 and 2267) Mandurah Road, Karnup</a></li>
	<li><a href="#Tavern">Proposed Tavern and Brewery - Lots 154 and 155 (No.175) Parkin Street, Rockingham</a></li>
</ul>
<p>The City has received an application seeking Development Approval for a fast food outlet, car museum, caretaker&#39;s dwelling, service station and car wash on the abovementioned land.</p>
<p>Details of the proposal are as follows:</p>
<ul>
	<li>Two drive-through fast food outlets</li>
	<li>A service station with an attached convenience store is proposed adjacent to Mandurah Road</li>
	<li>A car museum containing at least 13 classic cars and 6 motorcycles and associated memorabilia is proposed adjacent to the Mandurah railway line</li>
	<li>A caretaker&#39;s dwelling will be contained within the upper floor of the car museum</li>
	<li>A small cafe with an outdoor eating area will be attached to the car museum</li>
	<li>A drive-thru car wash will be located at the rear of the car museum and</li>
	<li>91 car parking bays are proposed in total to service the proposed use.</li>
</ul>
<p>Plans and information relating to the proposal are available via the links below.<br />
<br />
Before the City formally considers the application, we welcome your comments&nbsp;on the proposal. Should you wish to comment, please do so in writing to reach the Chief Executive Officer by no later than <strong>23&nbsp;December 2016</strong>.<br />
<br />
Any written submission received in response to this invitation may be placed on the public record and be available for inspection.</p>
<h4>Share your thoughts now</h4>
<ul>
	<li><a href="http://erock.rockingham.wa.gov.au/eservice/dialog/crm/selectCategory.do?key_num=950" target="_blank">Online</a></li>
	<li><a href="mailto:customer@rockingham.wa.gov.au?subject=Submission%20Response%20-%20Proposed%20Development%20-%20Lots%20102%20and%20104%20Mandurah%20Road,%20Karnup">Email</a></li>
	<li>mail: to Chief Executive Officer, City of Rockingham, PO Box 2142, Rockingham DC WA 6967.</li>
</ul>
<div class="general-table responsive">
    <table border="1" cellpadding="1" cellspacing="1">
	<thead>
		<tr>
			<th scope="col">Title</th>
			<th scope="col">Type</th>
			<th scope="col">Size and Format</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td><a href="/getmedia/5827f639-38ea-4c2d-8c0c-30a7afa1c598/PD_MandurahRD_DA-Plans.pdf.aspx" target="_blank">Development Application Plans</a></td>
			<td>Document</td>
			<td>PDF 1.4 MB</td>
		</tr>
		<tr>
			<td><a href="/getmedia/29697843-8e16-4f29-82a5-8ef31f7d4f2d/PD_MandurahRD_Submission-Form.pdf.aspx" target="_blank">Submission Response Form</a></td>
			<td>Document</td>
			<td>PDF 26 kb</td>
		</tr>
	</tbody>
</table>
</div>`

assert(tools.find_between(example_da, "</a>", "</h2>") == "Town Planning Advertising", "real find 1");
assert(tools.find_between(example_da, '<li><a href="#MandurahRD">', "</a></li>") == "Proposed Fast Food Outlets, Car Museum, Caretaker&#39;s Dwelling, Service Station and Car Wash - Lots 102 and 104 (No.2263 and 2267) Mandurah Road, Karnup", "real find 2");


console.log("NodeJS tests complete");
