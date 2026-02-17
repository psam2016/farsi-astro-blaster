# GitHub Pages Deployment Instructions

## 🌐 Making Your Game Live Online

Your Farsi Astro Blaster game is now ready to be deployed online! Follow these simple steps to enable GitHub Pages:

## Step 1: Enable GitHub Pages

1. Go to your repository on GitHub: https://github.com/psam2016/farsi-astro-blaster
2. Click on **Settings** (in the repository menu bar)
3. In the left sidebar, click on **Pages** (under "Code and automation")
4. Under "Build and deployment":
   - **Source**: Select "GitHub Actions"
5. Click **Save**

## Step 2: Trigger the Deployment

The deployment workflow will automatically run when you:
- Merge this pull request to the main branch, OR
- Manually trigger it from the Actions tab

To manually trigger:
1. Go to the **Actions** tab in your repository
2. Click on "Deploy to GitHub Pages" workflow
3. Click **Run workflow** button
4. Select the branch and click **Run workflow**

## Step 3: Access Your Live Game

Once the workflow completes successfully (green checkmark), your game will be live at:

**🎮 https://psam2016.github.io/farsi-astro-blaster/**

## What's Been Set Up

✅ **GitHub Actions Workflow** (`.github/workflows/deploy.yml`)
   - Automatically deploys your game when code is pushed
   - Can be manually triggered at any time
   - Handles all the build and deployment steps

✅ **`.nojekyll` file**
   - Tells GitHub Pages not to use Jekyll processing
   - Ensures your static files are served correctly

✅ **Updated README**
   - Added prominent "Play Now" link at the top
   - Updated "How to Run" section to highlight online play

## Troubleshooting

If the deployment doesn't work:

1. **Check Workflow Permissions**: 
   - Go to Settings > Actions > General
   - Under "Workflow permissions", ensure "Read and write permissions" is selected
   - Check "Allow GitHub Actions to create and approve pull requests"

2. **Check Pages Settings**:
   - Ensure "GitHub Actions" is selected as the source
   - No custom domain is interfering

3. **View Workflow Logs**:
   - Go to the Actions tab
   - Click on the latest workflow run
   - Check the logs for any error messages

## Future Updates

Every time you push new code to the main branch (or the configured branch), the game will automatically redeploy! Your changes will be live within a few minutes.

---

**Note**: The first deployment may take 2-5 minutes. Subsequent deployments are usually faster.

Enjoy your live game! 🚀🎮
