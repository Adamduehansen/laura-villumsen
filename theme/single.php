<?php
class CaseInfo {
  public $client;
  public $date;
  public $tags;
  public $website;
  public $notes;
}

class CaseInfoRenderer {
  function render($caseInfo) {
    $caseInfoHtml = "";
    $caseInfoHtml .= $this->append("Client", $caseInfo->client);
    $caseInfoHtml .= $this->append("Year", $caseInfo->date);
    $caseInfoHtml .= $this->append("Services", $caseInfo->tags);
    $caseInfoHtml .= $this->append(null, $caseInfo->website);
    $caseInfoHtml .= $this->append("Notes", $caseInfo->notes);

    return $caseInfoHtml;
  }

  private function get($title, $value) {
    $lowerTitle = strtolower($title);
    
    if ($lowerTitle == "year") {
      return substr($value, 0, 4);
    } else if (is_array($value)) {
      return $value;
    } else if (filter_var($value, FILTER_VALIDATE_URL)) {
      return "<a href='" . $value . "' target='_BLANK' rel='noopener noreferrer'>Visit website here</a>";
    } else {
      return $value;
    }
  }

  private function append($title, $value) {
    if (!$value) {
      return "";
    }

    $heading = $title ? "<p>" . $title . "</p>" : null;
    $text = $this->get($title, $value);

    return "<div>" . ($heading) . $text . "</div>";
  }
}

function render_case_info() {
  $caseInfo = new CaseInfo();
  $caseInfoRenderer = new CaseInfoRenderer();

  $caseInfo->client = get_field('client');
  $caseInfo->date = get_field('date');
  $caseInfo->tags = get_the_tags();
  $caseInfo->website = get_field('website');
  $caseInfo->notes = get_field('notes');

  return $caseInfoRenderer->render($caseInfo);
}
?>

<?php get_header(); ?>
<main>

<?php

$content = get_the_content();
$blocks = parse_blocks($content);

foreach ($blocks as $block) {
  if ($block['blockName'] == "custom/wp-case-info") {
    echo render_case_info();
  }
  
  echo render_block($block);
}

?>

</main>
<?php get_footer(); ?>