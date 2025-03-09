
if (git diff --exit-code $DRONE_COMMIT_BEFORE $DRONE_COMMIT_AFTER -- $1); 
then 
  echo "No changes in $1 directory, skipping pipeline";
  exit 78; 
fi